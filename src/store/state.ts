import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Faction from '@/services/enum/Faction'
import PlayerColor from '@/services/enum/PlayerColor'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        playerSetup: {
          playerCount: 1,
          botCount: 1,
          playerColors: [PlayerColor.RED, PlayerColor.BLUE, PlayerColor.GREEN, PlayerColor.YELLOW],
          botFactions: [],
          botDifficultyLevels: []
        }
      },
      cycles: []
    } as State
  },
  actions: {
    resetGame() {
      this.cycles = []
      this.setup.initialBotCardDecks = undefined
    },
    storeCycle(cycle : Cycle) {
      this.cycles = this.cycles.filter(item => item.cycle < cycle.cycle)
      this.cycles.push(cycle)
    },
    storeTurn(turn : Turn) {
      const cycle = this.cycles.find(item => item.cycle==turn.cycle)
      if (cycle) {
        cycle.turns = cycle.turns.filter(item => item.turn < turn.turn)
        cycle.turns.push(turn)
      }
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  cycles: Cycle[]
}
export interface Setup {
  playerSetup: PlayerSetup
  initialBotCardDecks?: CardDeckPersistence[]
  debugMode?: boolean
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  playerColors: PlayerColor[]
  botFactions: Faction[]
  botDifficultyLevels: DifficultyLevel[]
}

export interface Cycle {
  cycle: number
  startPlayer: number
  turns: Turn[]
}
export interface Turn {
  cycle: number
  turn: number
  player?: number
  bot?: number
  passed?: boolean
}
export interface CardDeckPersistence {
  deck: number[]
  reserve: number[]
  discard: number[]
}
