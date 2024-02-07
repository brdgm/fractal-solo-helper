import BotActions from '@/services/BotActions';
import CardDeck from '@/services/CardDeck';
import Technologies from '@/services/Technologies';
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
export default function getBotActions(state: State, cycle: number, turn: number, bot : number, action : number) : BotActions {
  // check current cycle
  const cycleData = state.cycles.find(item => item.cycle==cycle)
  if (cycleData) {
    const lastTurn = cycleData.turns
      .toSorted((a, b) => (a.action ?? 0) - (b.action ?? 0))
      .toSorted((a, b) => a.turn - b.turn)
      .findLast(item => item.cycle==cycle && (item.turn<turn || item.turn==turn && (item.action ?? 0)<action) && item.bot==bot)
    if (lastTurn?.botActions) {
      return BotActions.fromPersistence(lastTurn.botActions)
    }
  }
  // check previous cycle
  if (cycle > 1) {
    const botActions = getBotActions(state, cycle - 1, MAX_TURN, bot, action)
    botActions.cardDeck.prepareForNextCycle()
    return botActions
  }
  // get initial card deck
  let initialCardDeck = (state.setup.initialBotCardDecks ?? [])[bot-1]
  if (!initialCardDeck) {
    initialCardDeck = CardDeck.new(DifficultyLevel.NORMAL).toPersistence()  // fallback, should never happen
  }
  return new BotActions(CardDeck.fromPersistence(initialCardDeck), new Technologies())
}
