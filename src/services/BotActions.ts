import { BotActionsPersistence } from '@/store/state'
import { CardAction } from './Card'
import CardDeck from './CardDeck'
import Technologies from './Technologies'
import Action from './enum/Action'
import Behavior from './enum/Behavior'
import ColonyType from './enum/ColonyType'
import ConditionalActivation from './enum/ConditionalActivation'
import LivingStormDirection from './enum/LivingStormDirection'
import LivingStormOrientation from './enum/LivingStormOrientation'
import PlayerColor from './enum/PlayerColor'
import UnitType from './enum/UnitType'

/**
 * Bot actions in this turn based on AI protocol cards.
 */
export default class BotActions {

  private _bot : number
  private _cardDeck : CardDeck
  private _technologies : Technologies

  public constructor(bot: number, cardDeck: CardDeck, technologies: Technologies) {
    this._bot = bot
    this._cardDeck = cardDeck
    this._technologies = technologies
  }

  public get bot() : number {
    return this._bot
  }

  public get cardDeck() : CardDeck {
    return this._cardDeck
  }

  public get technologies() : Technologies {
    return this._technologies
  }

  public get actions() : readonly BotAction[] {
    return getCardActions(this._cardDeck).map(toBotAction)
  }

  public get behavior() : Behavior {
    return getBehavior(this._cardDeck)
  }

  public get livingStormDirection() : LivingStormDirection {
    return this._cardDeck.actionCard?.livingStormDirection ?? LivingStormDirection.DOWN_RIGHT
  }

  public get livingStormOrientation() : LivingStormOrientation {
    return this._cardDeck.actionCard?.livingStormOrientation ?? LivingStormOrientation.VERTICAL
  }

  public get playerPriority() : PlayerColor[]|undefined {
    return this._cardDeck.actionCard?.playerPriority
  }

  public get playerPriorityWatcherToken() : boolean {
    return this._cardDeck.actionCard?.playerPriorityWatcherToken ?? false
  }

  public get unitPriority() : UnitType[] {
    return this._cardDeck.actionCard?.unitPriority ?? []
  }

  public get colonyPriority() : ColonyType[] {
    return this._cardDeck.actionCard?.colonyPriority ?? []
  }

  /**
   * Gets persistence view of bot actions.
   */
  public toPersistence() : BotActionsPersistence {
    return {
      cardDeck: this._cardDeck.toPersistence(),
      technologies: this._technologies.toPersistence()
    }
  }

  /**
   * Re-creates bot actions from persistence.
   * @param persistence Persistence
   */
  public static fromPersistence(bot: number, persistence: BotActionsPersistence) : BotActions {
    return new BotActions(
      bot,
      CardDeck.fromPersistence(persistence.cardDeck),
      Technologies.fromPersistence(persistence.technologies)
    )
  }

}

/**
 * Transform card actions into bot actions.
 */
function toBotAction(cardAction: CardAction) : BotAction {
  const items : BotActionItem[] = []

  if (cardAction.actions.length == 1) {
    items.push({ actions: [cardAction.actions[0]] })
  }
  else if (cardAction.actions.length == 2 && cardAction.conditionalActivation) {
    switch (cardAction.conditionalActivation) {
      case ConditionalActivation.FIRST_OR_SECOND:
        items.push({ actions: [cardAction.actions[0]] })
        items.push({ actions: [cardAction.actions[1]], alternative: true })
        break
      case ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND:
        items.push({ actions: cardAction.actions })
        break
      default:
        throw new Error(`Unknown conditional activation: ${cardAction.conditionalActivation}`)
    }
  }

  // last breath
  if (!items.find(item => item.actions.includes(Action.ADVANCE) || item.actions.includes(Action.MOVEMENT_SINGLE))) {
    items.push({ actions: [Action.ADVANCE], fallback: true })
  }
  if (!items.find(item => item.actions.includes(Action.RECRUIT))) {
    items.push({ actions: [Action.RECRUIT], fallback: true })
  }

  if (cardAction.actionCardSlot) {
    items.forEach(item => {
      if (item.actions.includes(Action.ACTION_CARD) || item.actions.includes(Action.LOSE_INFLUENCE_ACTION_CARD)) {
        item.actionCardSlot = cardAction.actionCardSlot
      }
    })
  }
  return { items }
}

/**
 * Get actions to perform as indicated by the support card.
 */
function getCardActions(cardDeck: CardDeck) : CardAction[] {
  const actions : CardAction[] = []
  const actionCard = cardDeck.actionCard
  const supportCard = cardDeck.supportCard
  if (actionCard && supportCard) {
    supportCard.triggerSlots.forEach(slot => {
      const action = actionCard.actions[slot - 1]
      if (action) {
        actions.push(action)
      }
    })
  }
  return actions
}

/**
 * Get AI behavior this turn as indicated by the support card.
 */
function getBehavior(cardDeck: CardDeck) : Behavior {
  let behavior : Behavior|undefined
  const actionCard = cardDeck.actionCard
  const supportCard = cardDeck.supportCard
  if (actionCard && supportCard) {
    behavior = actionCard.behavior[supportCard.behaviorSlot - 1]
  }
  if (!behavior) {
    behavior = Behavior.AGGRESSIVE  // fallback
  }
  return behavior
}

export interface BotAction {
  items: BotActionItem[]
}

export interface BotActionItem {
  actions: Action[]
  alternative?: boolean
  fallback?: boolean
  actionCardSlot?: number
}
