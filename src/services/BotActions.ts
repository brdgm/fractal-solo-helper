import { CardAction } from './Card'
import CardDeck from './CardDeck'
import Action from './enum/Action'
import Behavior from './enum/Behavior'

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

    this._actions = getBotActions(getCardActions(cardDeck))
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
function getBotActions(cardActions: CardAction[]) : BotAction[] {
  const actions : BotAction[] = []
  cardActions.forEach(cardAction => {
    if (cardAction.actions.length == 1) {
      actions.push(toBotAction(cardAction, cardAction.actions[0]))
    }
    else if (cardAction.actions.length == 2 && cardAction.conditionalActivation) {
      // TODO: implement
    }
  })
  return actions
}

function toBotAction(cardAction: CardAction, action: Action) : BotAction {
  const botAction : BotAction = { action }
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
  action: Action
  alternative?: boolean
  fallback?: boolean
  actionCardSlot?: number
}
