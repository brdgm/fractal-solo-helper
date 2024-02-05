import { CardAction } from './Card'
import CardDeck from './CardDeck'
import Action from './enum/Action'
import Behavior from './enum/Behavior'
import ConditionalActivation from './enum/ConditionalActivation'

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

  public get actions() : readonly BotAction[] {
    return this._actions
  }

  public get behavior() : Behavior {
    return this._behavior
  }

}

/**
 * Transform card actions into bot actions.
 */
function toBotAction(cardAction: CardAction) : BotAction {
  const items : BotActionItem[] = []

  if (cardAction.actions.length == 1) {
    items.push({ action: cardAction.actions[0] })
  }
  else if (cardAction.actions.length == 2 && cardAction.conditionalActivation) {
    switch (cardAction.conditionalActivation) {
      case ConditionalActivation.FIRST_OR_SECOND:
        items.push({ action: cardAction.actions[0] })
        items.push({ action: cardAction.actions[1], fallback: true })
        break
      case ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND:
        items.push({ action: cardAction.actions[0] })
        items.push({ action: cardAction.actions[1] })
        break
      default:
        throw new Error(`Unknown conditional activation: ${cardAction.conditionalActivation}`)
    }
  }

  // last breath
  if (!items.find(item => item.action == Action.ADVANCE || item.action == Action.MOVEMENT_SINGLE)) {
    items.push({ action: Action.ADVANCE, fallback: true })
  }
  if (!items.find(item => item.action == Action.RECRUIT)) {
    items.push({ action: Action.RECRUIT, fallback: true })
  }

  const botAction : BotAction = { items }
  if (cardAction.actionCardSlot) {
    botAction.actionCardSlot = cardAction.actionCardSlot
  }
  return botAction
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
  actionCardSlot?: number
}

export interface BotActionItem {
  action: Action
  fallback?: boolean
}
