import BotActions from '@/services/BotActions'
import CardDeck from '@/services/CardDeck'
import Technologies from '@/services/Technologies'
import { State } from '@/store/state'

/**
 * Get persisted bot actions for all bots from previous turn/action
 * or last turn/action of previous cycle, or based on the initial card deck.
 * @param state State
 * @param cycle Cycle
 * @param stateIndex State index
 * @returns Bot actions for each bot
 */
export default function getBotsActions(state: State, cycle: number, stateIndex: number) : BotActions[] {
  // check current cycle
  const cycleData = state.cycles.find(item => item.cycle==cycle)
  if (cycleData) {
    const lastTurn = cycleData.turns
      .toSorted((a, b) => a.stateIndex - b.stateIndex)
      .findLast(item => item.cycle==cycle && item.stateIndex < stateIndex)
    if (lastTurn) {
      return lastTurn.botsActions.map((persistence,index) => BotActions.fromPersistence(index+1,persistence))
    }
  }
  let botsActions
  if (cycle > 1) {
    // check previous cycle
    botsActions = getBotsActions(state, cycle - 1, Number.MAX_VALUE)
    botsActions.forEach(botActions => botActions.cardDeck.prepareForNextCycle())
  }
  else {
    // use initial card decks
    botsActions = (state.setup.initialBotCardDecks ?? [])
      .map(persistence => CardDeck.fromPersistence(persistence))
      .map((cardDeck,index) => new BotActions(index+1, cardDeck, new Technologies()))      
  }
  return botsActions
}
