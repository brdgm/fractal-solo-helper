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
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
      this.setup.initialBotCardDecks = undefined
    },
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round < round.round)
      this.rounds.push(round)
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  rounds: Round[]
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

export interface Round {
  round: number
}
export interface CardDeckPersistence {
  deck: number[]
  reserve: number[]
  discard: number[]
}
