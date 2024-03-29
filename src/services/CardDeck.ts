import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import DifficultyLevel from './enum/DifficultyLevel'
import { CardDeckPersistence } from '@/store/state'
import GainProtocolCardReason from './enum/GainProtocolCardReason'

/**
 * Deck of AI protocol cards with draw pile, discard pile and reserve.
 */
export default class CardDeck {

  private _active? : Card
  private _deck : Card[]
  private _reserve : Card[]
  private _discard : Card[]
  private _gainProtocolCardReasons: GainProtocolCardReason[]

  private constructor(active: Card|undefined, deck : Card[], reserve : Card[], discard : Card[],
      gainProtocolCardReasons: GainProtocolCardReason[]) {
    this._active = active
    this._deck = deck
    this._reserve = reserve
    this._discard = discard
    this._gainProtocolCardReasons = gainProtocolCardReasons
  }

  public get deck() : readonly Card[] {
    return this._deck
  }

  public get reserve() : readonly Card[] {
    return this._reserve
  }

  public get discard() : readonly Card[] {
    return this._discard
  }

  public get gainProtocolCardReasons() : readonly GainProtocolCardReason[] {
    return this._gainProtocolCardReasons
  }

  /**
   * Total available cards (all cards except the reserve)
   */
  public get totalCards() : number {
    return this._deck.length + this._discard.length + (this._active ? 1 : 0)
  }

  public get actionCard() : Card|undefined {
    return this._active
  }

  public get supportCard() : Card|undefined {
    return this._discard[0]
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    const persistence : CardDeckPersistence = {
      deck: this._deck.map(card => card.id),
      reserve: this._reserve.map(card => card.id),
      discard: this._discard.map(card => card.id),
      gainProtocolCardReasons: [...this._gainProtocolCardReasons]
    }
    if (this._active) {
      persistence.active = this._active.id
    }
    return persistence
  }

  /**
   * Draw a new card as active action card. Topmost card on discard pile is support card.
   * @return true if a card was drawn and there is an active actin card. if false, bot will pass.
   */
  public draw() : boolean {
    // discard current active card
    if (this._active) {
      this._discard.unshift(this._active)
    }
    // draw new active card
    this._active = this._deck.shift()
    return this._active != undefined
  }

  /**
   * Bot passes after this round if this is the last action card.
   */
  public isPass() : boolean {
    return (this._deck.length == 0)
  }

  /**
   * Prepare card deck for new cycle, adding additional card from reserve.
   */
  public prepareForNextCycle() : void {
    // discard all remaining cards
    if (this._active) {
      this._discard.push(this._active)
      this._active = undefined
    }
    this._deck.forEach(card => this._discard.push(card))
    this._deck = []
    // shuffle discard as new deck
    this._deck = shuffle(this._discard)
    this._discard = []
    // discard 1st card
    this.draw()
  }

  /**
   * @returns Maximum number of cards that can be gained additionally (= in the reserve).
   */
  public get canGainCardCount() : number {
    return this._reserve.length
  }

  /**
   * Maximum number of cards that can be lost.
   */
  public get canLoseCardCount() : number {
    // keep min. 4 cards (ignoring other difficulty levels here)
    return this.totalCards - 4
  }

  /**
   * Maximum number of cards that can be returned from discard pile to the deck.
   * At least one card must remain in the discard pile.
   */
  public get canReturnCardCount() : number {
    return Math.max(this._discard.length - 1, 0)
  }

  /**
   * Gain additional cards from reserve.
   * @param reason Reason for gaining cards
   * @param count Number of cards
   */
  public gainCards(reason: GainProtocolCardReason, count: number) : void {
    if (count > this.canGainCardCount) {
      throw new Error(`Unable to gain ${count} cards, only ${this.canGainCardCount} available.`)
    }
    for (let i=0; i < count; i++) {
      const reserveCard = this._reserve.shift()
      if (reserveCard) {
        this._discard.unshift(reserveCard)
        if (reason != GainProtocolCardReason.PRODUCTIVE_COLONY) {
          this._gainProtocolCardReasons.push(reason)
        }
      }
    }
  }

  /**
   * Lose cards to reserve. Shuffles reserve afterwards.
   * @param reason Reason for losing cards
   * @param count Number of cards
   */
  public loseCards(reason: GainProtocolCardReason, count: number) : void {
    if (count > this.canLoseCardCount) {
      throw new Error(`Unable to lose ${count} cards, only ${this.canLoseCardCount} can be lost.`)
    }
    if (reason != GainProtocolCardReason.PRODUCTIVE_COLONY) {
      throw new Error(`Unable to lose cards for reason ${reason}.`)
    }
    for (let i=0; i < count; i++) {
      const discardCard = this._discard.shift()
      if (discardCard) {
        this._reserve.unshift(discardCard)
      }
    }
    this._reserve = shuffle(this._reserve)
  }

  /**
   * Return cards from discard pile to deck.
   * @param count Number of cards
   */
  public returnCards(count: number) : void {
    if (count > this.canReturnCardCount) {
      throw new Error(`Unable to return ${count} cards, only ${this.canReturnCardCount} can be returned.`)
    }
    for (let i=0; i < count; i++) {
      const discardCard = this._discard.shift()
      if (discardCard) {
        this._deck.unshift(discardCard)
      }
    }
  }

  /**
   * Creates a shuffled new deck and reserve deck.
   * @param difficultyLevel Difficulty level
   * @param additionalCards Number of additional cards to add to deck
   */
  public static new(difficultyLevel : DifficultyLevel, additionalCards: number = 0) : CardDeck {
    const allCards = shuffle(Cards.getAll())
    const deck : Card[] = []
    const reserve : Card[] = []

    // pull in protocol cards based on difficulty level, the rest makes the reserve deck
    let startingCards = 4 + additionalCards
    if (difficultyLevel == DifficultyLevel.HARD) {
      startingCards += 1
    }
    else if (difficultyLevel == DifficultyLevel.IMPOSSIBLE) {
      startingCards += 2
    }
    for (let i=0; i < allCards.length; i++) {
      if (i < startingCards) {
        deck.push(allCards[i])
      }
      else {
        reserve.push(allCards[i])
      }
    }

    const cardDeck = new CardDeck(undefined, deck, reserve, [], [])
    // discard 1st card
    cardDeck.draw()
    return cardDeck
  }

  /**
   * Re-creates a card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.active ? Cards.get(persistence.active) : undefined,
      persistence.deck.map(Cards.get),
      persistence.reserve.map(Cards.get),
      persistence.discard.map(Cards.get),
      [...persistence.gainProtocolCardReasons ?? []]
    )
  }

}
