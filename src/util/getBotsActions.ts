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
 * @param checkConflictPhase Check for results of conflict phase first in this cycle
 * @returns Bot actions for each bot
 */
export default function getBotsActions(state: State, cycle: number, stateIndex: number,
    checkConflictPhase: boolean = false) : BotActions[] {
  // check current cycle
  const cycleData = state.cycles.find(item => item.cycle==cycle)
  if (cycleData) {
    if (checkConflictPhase && cycleData.conflictPhase) {
      return cycleData.conflictPhase.botsActions.map((persistence,index) => BotActions.fromPersistence(index+1,persistence))
    }
    const lastTurn = cycleData.turns
      .toSorted((a, b) => a.stateIndex - b.stateIndex)
      .findLast(item => item.cycle==cycle && item.stateIndex < stateIndex)
    if (lastTurn) {
      return lastTurn.botsActions.map((persistence,index) => BotActions.fromPersistence(index+1,persistence))
    }
  }
  let botsActions
  if (cycle > 1) {
    // check previous cycle, check first for conflict phase in that cycle
    botsActions = getBotsActions(state, cycle - 1, Number.MAX_VALUE, true)
    botsActions.forEach(botActions => botActions.cardDeck.prepareForNextCycle())
  }
  else {
    // use initial card decks
    botsActions = (state.setup.initialBotCardDecks ?? [])
      .map(persistence => CardDeck.fromPersistence(persistence))
      .map((cardDeck,index) => {
        let technologies = new Technologies()
        const initialTechnologies = state.setup.initialBotTechnologies?.[index]
        if (initialTechnologies) {
          technologies = Technologies.fromPersistence(initialTechnologies)
        }
        return new BotActions(index+1, cardDeck, technologies)
      })
  }
  return botsActions
}
