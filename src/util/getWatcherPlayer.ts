import { State } from '@/store/state'
import { PlayerOrder } from './getPlayerOrder'

/**
 * Gets the watcher (player/bot that passed first) in this cycle.
 * @param state State
 * @param cycle Cycle
 * @param stateIndex Check up to (excluding) this state index
 * @returns Player/bot number
 */
export default function getWatcherPlayer(state: State, cycle: number,
    stateIndex: number = Number.MAX_VALUE) : PlayerOrder {
  const cycleData = state.cycles.find(item => item.cycle==cycle)
  if (cycleData) {
    const firstPassTurn = cycleData.turns
        .toSorted((a, b) => a.stateIndex - b.stateIndex)
        .filter(item => item.stateIndex < stateIndex)
        .find(item => item.passed)
    if (firstPassTurn) {
      const { player, bot } = firstPassTurn
      return { player, bot }
    }
  }
  return {}
}
