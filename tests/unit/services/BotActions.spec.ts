import BotActions from '@/services/BotActions'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import Behavior from '@/services/enum/Behavior'
import { expect } from 'chai'

describe('BotActions', () => {
  it('card-1+2', () => {
    const cardDeck = CardDeck.fromPersistence({deck:[2,1], discard:[], reserve:[]})
    const botActions = new BotActions(cardDeck)

    expect(cardDeck.actionCard?.id, 'actionCard').to.eq(1)
    expect(cardDeck.supportCard?.id, 'supportCard').to.eq(2)
    
    expect(botActions.behavior).to.eq(Behavior.EXPANSIVE)
    expect(botActions.actions[0]).to.eql({
      items: [
        { action: Action.COLONIZE },
        { action: Action.ADVANCE, fallback: true },
        { action: Action.RECRUIT, fallback: true },
      ]
    })
    expect(botActions.actions[1]).to.eql({
      items: [
        { action: Action.RESEARCH_MILITARY },
        { action: Action.MOVEMENT_SINGLE, fallback: true },
        { action: Action.RECRUIT, fallback: true },
      ]
    })
  })

  it('card-1+4', () => {
    const cardDeck = CardDeck.fromPersistence({deck:[4,1], discard:[], reserve:[]})
    const botActions = new BotActions(cardDeck)

    expect(cardDeck.actionCard?.id, 'actionCard').to.eq(1)
    expect(cardDeck.supportCard?.id, 'supportCard').to.eq(4)
    
    expect(botActions.behavior).to.eq(Behavior.VICTORY)
    expect(botActions.actions[0]).to.eql({
      items: [
        { action: Action.COLONIZE },
        { action: Action.RECRUIT, fallback: true },
        { action: Action.ADVANCE, fallback: true },
      ]
    })
    expect(botActions.actions[1]).to.eql({
      items: [
        { action: Action.ACTION_CARD },
        { action: Action.ADVANCE, fallback: true },
        { action: Action.RECRUIT, fallback: true },
      ],
      actionCardSlot: 4
    })
  })

  it('card-4+1', () => {
    const cardDeck = CardDeck.fromPersistence({deck:[1,4], discard:[], reserve:[]})
    const botActions = new BotActions(cardDeck)

    expect(cardDeck.actionCard?.id, 'actionCard').to.eq(4)
    expect(cardDeck.supportCard?.id, 'supportCard').to.eq(1)
    
    expect(botActions.behavior).to.eq(Behavior.AGGRESSIVE)
    expect(botActions.actions[0]).to.eql({
      items: [
        { action: Action.COLONIZE },
        { action: Action.ADVANCE, fallback: true },
        { action: Action.RECRUIT, fallback: true },
      ]
    })
    expect(botActions.actions[1]).to.eql({
      items: [
        { action: Action.GAIN_INFLUENCE },
        { action: Action.LIVING_STORM_MOVEMENT },
        { action: Action.ADVANCE, fallback: true },
        { action: Action.RECRUIT, fallback: true },
      ]
    })
  })

  it('card-6+2', () => {
    const cardDeck = CardDeck.fromPersistence({deck:[2,6], discard:[], reserve:[]})
    const botActions = new BotActions(cardDeck)

    expect(cardDeck.actionCard?.id, 'actionCard').to.eq(6)
    expect(cardDeck.supportCard?.id, 'supportCard').to.eq(2)
    
    expect(botActions.behavior).to.eq(Behavior.EXPANSIVE)
    expect(botActions.actions[0]).to.eql({
      items: [
        { action: Action.COLONIZE },
        { action: Action.ADVANCE, fallback: true },
        { action: Action.RECRUIT, fallback: true },
      ]
    })
    expect(botActions.actions[1]).to.eql({
      items: [
        { action: Action.LOOSE_INFLUENCE_ACTION_CARD },
        { action: Action.ADVANCE, fallback: true },
        { action: Action.RECRUIT, fallback: true },
      ],
      actionCardSlot: 2
    })
  })
})