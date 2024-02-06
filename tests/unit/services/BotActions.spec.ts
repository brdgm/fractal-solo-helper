import BotActions from '@/services/BotActions'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import Behavior from '@/services/enum/Behavior'
import { expect } from 'chai'

describe('BotActions', () => {
  it('card-1+2', () => {
    const cardDeck = CardDeck.fromPersistence({deck:[1], discard:[2], reserve:[]})
    const botActions = new BotActions(cardDeck)

    expect(cardDeck.actionCard?.id, 'actionCard').to.eq(1)
    expect(cardDeck.supportCard?.id, 'supportCard').to.eq(2)
    
    expect(botActions.behavior).to.eq(Behavior.EXPANSIVE)
    expect(botActions.actions[0]).to.eql({
      items: [
        { actions: [Action.COLONIZE] },
        { actions: [Action.ADVANCE], alternative: true },
        { actions: [Action.RECRUIT], fallback: true },
      ]
    })
    expect(botActions.actions[1]).to.eql({
      items: [
        { actions: [Action.RESEARCH_MILITARY] },
        { actions: [Action.MOVEMENT_SINGLE], alternative: true },
        { actions: [Action.RECRUIT], fallback: true },
      ]
    })
  })

  it('card-1+4', () => {
    const cardDeck = CardDeck.fromPersistence({deck:[1], discard:[4], reserve:[]})
    const botActions = new BotActions(cardDeck)

    expect(cardDeck.actionCard?.id, 'actionCard').to.eq(1)
    expect(cardDeck.supportCard?.id, 'supportCard').to.eq(4)
    
    expect(botActions.behavior).to.eq(Behavior.VICTORY)
    expect(botActions.actions[0]).to.eql({
      items: [
        { actions: [Action.COLONIZE] },
        { actions: [Action.RECRUIT], alternative: true },
        { actions: [Action.ADVANCE], fallback: true },
      ]
    })
    expect(botActions.actions[1]).to.eql({
      items: [
        { actions: [Action.ACTION_CARD], actionCardSlot: 4 },
        { actions: [Action.ADVANCE], fallback: true },
        { actions: [Action.RECRUIT], fallback: true },
      ]
    })
  })

  it('card-4+1', () => {
    const cardDeck = CardDeck.fromPersistence({deck:[4], discard:[1], reserve:[]})
    const botActions = new BotActions(cardDeck)

    expect(cardDeck.actionCard?.id, 'actionCard').to.eq(4)
    expect(cardDeck.supportCard?.id, 'supportCard').to.eq(1)
    
    expect(botActions.behavior).to.eq(Behavior.AGGRESSIVE)
    expect(botActions.actions[0]).to.eql({
      items: [
        { actions: [Action.COLONIZE] },
        { actions: [Action.ADVANCE], alternative: true },
        { actions: [Action.RECRUIT], fallback: true },
      ]
    })
    expect(botActions.actions[1]).to.eql({
      items: [
        { actions: [Action.GAIN_INFLUENCE,Action.LIVING_STORM_MOVEMENT] },
        { actions: [Action.ADVANCE], fallback: true },
        { actions: [Action.RECRUIT], fallback: true },
      ]
    })
  })

  it('card-6+2', () => {
    const cardDeck = CardDeck.fromPersistence({deck:[6], discard:[2], reserve:[]})
    const botActions = new BotActions(cardDeck)

    expect(cardDeck.actionCard?.id, 'actionCard').to.eq(6)
    expect(cardDeck.supportCard?.id, 'supportCard').to.eq(2)
    
    expect(botActions.behavior).to.eq(Behavior.EXPANSIVE)
    expect(botActions.actions[0]).to.eql({
      items: [
        { actions: [Action.COLONIZE] },
        { actions: [Action.ADVANCE], alternative: true },
        { actions: [Action.RECRUIT], fallback: true },
      ]
    })
    expect(botActions.actions[1]).to.eql({
      items: [
        { actions: [Action.LOOSE_INFLUENCE_ACTION_CARD], actionCardSlot: 2 },
        { actions: [Action.ADVANCE], fallback: true },
        { actions: [Action.RECRUIT], fallback: true },
      ]
    })
  })
})
