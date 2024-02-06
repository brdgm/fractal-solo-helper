import { CardAction } from './Card'
import CardDeck from './CardDeck'
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

  private _cardDeck : CardDeck
  private _actions : BotAction[]
  private _behavior : Behavior

  public constructor(cardDeck : CardDeck) {
    this._cardDeck = cardDeck

    // draw next card
    this._cardDeck.draw()

    this._actions = getCardActions(cardDeck).map(toBotAction)
    this._behavior = getBehavior(cardDeck)
  }

  public get cardDeck() : CardDeck {
    return this._cardDeck
  }

  public get actions() : readonly BotAction[] {
    return this._actions
  }

  public get behavior() : Behavior {
    return this._behavior
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

  // last breath: fallback to advance (only if standard advance action is not already present)
  if (!items.find(item => item.actions.includes(Action.ADVANCE) || item.actions.includes(Action.MOVEMENT_SINGLE))) {
    items.push({ actions: [Action.ADVANCE], fallback: true })
  }
  // last breath: fallback to recruit. the "normal" recruit is skipped if not enough are left, this is a last resort recruit
  items.push({ actions: [Action.RECRUIT], fallback: true })

  if (cardAction.actionCardSlot) {
    items.forEach(item => {
      if (item.actions.includes(Action.ACTION_CARD) || item.actions.includes(Action.LOOSE_INFLUENCE_ACTION_CARD)) {
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
