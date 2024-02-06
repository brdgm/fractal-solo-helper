import CardDeck from '@/services/CardDeck';
import DifficultyLevel from '@/services/enum/DifficultyLevel';
import { State } from '@/store/state';
import { MAX_TURN } from '@/util/getTurnOrder'

/**
 * Get card deck for given bot from previous turn, or last turn of previous cycle, or the initial one.
 * @param state State
 * @param cycle Cycle
 * @param turn Turn
 * @param bot Bot
 * @param action Bot action
 * @returns Card deck
 */
export default function getBotCardDeck(state: State, cycle: number, turn: number, bot : number, action : number) : CardDeck {
  // check current cycle
  const cycleData = state.cycles.find(item => item.cycle==cycle)
  if (cycleData) {
    const lastTurn = cycleData.turns
      .toSorted((a, b) => (a.action ?? 0) - (b.action ?? 0))
      .toSorted((a, b) => a.turn - b.turn)
      .findLast(item => item.cycle==cycle && (item.turn<turn || item.turn==turn && (item.action ?? 0)<action) && item.bot==bot)
    if (lastTurn?.botCardDeck) {
      return CardDeck.fromPersistence(lastTurn.botCardDeck)
    }
  }
  // check previous cycle
  if (cycle > 1) {
    const cardDeck = getBotCardDeck(state, cycle - 1, MAX_TURN, bot, action)
    cardDeck.prepareForNextCycle()
    return cardDeck
  }
  // get initial card deck
  const initialCardDeck = (state.setup.initialBotCardDecks ?? [])[bot-1]
  if (initialCardDeck) {
    return CardDeck.fromPersistence(initialCardDeck)
  }
  return CardDeck.new(DifficultyLevel.NORMAL)  // fallback, should never happen
}
