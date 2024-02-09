import CardDeck from '@/services/CardDeck'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new-normal', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.NORMAL)

    expect(cardDeck.actionCard, 'action card').to.not.undefined
    expect(cardDeck.deck.length, 'deck size').to.eq(3)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(6)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
    expect(cardDeck.totalCards, 'total cards').to.eq(4)
    expect(cardDeck.canGainCardCount, 'can gain').to.eq(6)
    expect(cardDeck.canLoseCardCount, 'can lose').to.eq(0)

    const persistence = cardDeck.toPersistence()
    expect(persistence.active, 'action card').to.not.undefined
    expect(persistence.deck.length, 'deck size').to.eq(3)
    expect(persistence.reserve.length, 'reserve size').to.eq(6)
    expect(persistence.discard.length, 'discard size').to.eq(0)
  })

  it('new-hard', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.HARD)

    expect(cardDeck.actionCard, 'action card').to.not.undefined
    expect(cardDeck.deck.length, 'deck size').to.eq(4)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(5)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('new-hard-additional-2', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.HARD, 2)

    expect(cardDeck.actionCard, 'action card').to.not.undefined
    expect(cardDeck.deck.length, 'deck size').to.eq(6)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(3)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
    expect(cardDeck.totalCards, 'total cards').to.eq(7)
    expect(cardDeck.canGainCardCount, 'can gain').to.eq(3)
    expect(cardDeck.canLoseCardCount, 'can lose').to.eq(3)
  })

  it('new-impossible', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.IMPOSSIBLE)

    expect(cardDeck.actionCard, 'action card').to.not.undefined
    expect(cardDeck.deck.length, 'deck size').to.eq(5)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(4)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('draw', () => {
    const cardDeck = CardDeck.fromPersistence({active: 1, deck:[2], discard:[3], reserve:[]})

    expect(cardDeck.actionCard?.id, 'actionCard').to.eq(1)
    expect(cardDeck.supportCard?.id, 'supportCard').to.eq(3)
    expect(cardDeck.isPass()).to.false
    
    // draw
    expect(cardDeck.draw()).to.true
    expect(cardDeck.actionCard?.id, 'actionCard').to.eq(2)
    expect(cardDeck.supportCard?.id, 'supportCard').to.eq(1)
    expect(cardDeck.isPass()).to.true

    // no more to draw
    expect(cardDeck.draw()).to.false
    expect(cardDeck.isPass()).to.true
  })

  it('prepareForNextCycle', () => {
    const cardDeck = CardDeck.fromPersistence({active:5,deck:[1],discard:[2,3],reserve:[4]})

    cardDeck.prepareForNextCycle()

    expect(cardDeck.actionCard, 'action card').to.not.undefined
    expect(cardDeck.deck.length, 'deck size').to.eq(3)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(1)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('gain-lose', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.NORMAL)
    
    cardDeck.gainCards(2)

    expect(cardDeck.reserve.length, 'reserve size').to.eq(4)
    expect(cardDeck.discard.length, 'discard size').to.eq(2)
    expect(cardDeck.canGainCardCount, 'can gain').to.eq(4)
    expect(cardDeck.canLoseCardCount, 'can lose').to.eq(2)

    cardDeck.loseCards(1)

    expect(cardDeck.reserve.length, 'reserve size').to.eq(5)
    expect(cardDeck.discard.length, 'discard size').to.eq(1)
    expect(cardDeck.canGainCardCount, 'can gain').to.eq(5)
    expect(cardDeck.canLoseCardCount, 'can lose').to.eq(1)
  })
})
