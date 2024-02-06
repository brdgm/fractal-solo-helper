import CardDeck from '@/services/CardDeck'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('CardDeck', () => {
  it('new-normal', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.NORMAL)

    expect(cardDeck.deck.length, 'deck size').to.eq(4)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(6)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)

    const persistence = cardDeck.toPersistence()
    expect(persistence.deck.length, 'deck size').to.eq(4)
    expect(persistence.reserve.length, 'reserve size').to.eq(6)
    expect(persistence.discard.length, 'discard size').to.eq(0)
  })

  it('new-hard', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.HARD)

    expect(cardDeck.deck.length, 'deck size').to.eq(5)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(5)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('new-hard-additional-2', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.HARD, 2)

    expect(cardDeck.deck.length, 'deck size').to.eq(7)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(3)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('new-impossible', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.IMPOSSIBLE)

    expect(cardDeck.deck.length, 'deck size').to.eq(6)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(4)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('draw', () => {
    const cardDeck = CardDeck.fromPersistence({deck:[1,2], discard:[3], reserve:[]})

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
    const cardDeck = CardDeck.fromPersistence({deck:[1], discard:[2,3], reserve:[4]})

    cardDeck.prepareForNextCycle()

    expect(cardDeck.deck.length, 'deck size').to.eq(3)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(1)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })
})
