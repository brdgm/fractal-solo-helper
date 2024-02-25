import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Faction from '@/services/enum/Faction'
import PlayerColor from '@/services/enum/PlayerColor'
import Technology from '@/services/enum/Technology'
import GainProtocolCardReason from '@/services/enum/GainProtocolCardReason'
import CampaignOption from '@/services/enum/CampaignOption'

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
      this.setup.initialBotTechnologies = undefined
    },
    storeCycle(cycle : Cycle) {
      this.cycles = this.cycles.filter(item => item.cycle < cycle.cycle)
      this.cycles.push(cycle)
    },
    storeCycleConflictPhase(conflictPhase : ConflictPhase) {
      const cycle = this.cycles.find(item => item.cycle==conflictPhase.cycle)      
      if (cycle) {
        cycle.conflictPhase = conflictPhase
      }
    },
    storeCycleEnd(cycleEnd : CycleEnd) {
      const cycle = this.cycles.find(item => item.cycle==cycleEnd.cycle)      
      if (cycle) {
        cycle.cycleEnd = cycleEnd
      }
    },
    storeTurn(turn : Turn) {
      const cycle = this.cycles.find(item => item.cycle==turn.cycle)
      if (cycle) {
        cycle.turns = cycle.turns.filter(item => 
            (item.turn < turn.turn || (item.turn == turn.turn && (item.action ?? 0) < (turn.action ?? 0)))
            || item.player != turn.player || item.bot != turn.bot)
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
  initialBotTechnologies?: TechnologiesPersistence[]
  campaignOptions?: CampaignOption[]
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
  conflictPhase?: ConflictPhase
  cycleEnd?: CycleEnd
}
export interface Turn {
  stateIndex: number
  cycle: number
  turn: number
  player?: number
  bot?: number
  action?: number
  passed?: boolean
  botsActions: BotActionsPersistence[]
}
export interface ConflictPhase {
  cycle: number
  botsActions: BotActionsPersistence[]
}
export interface CycleEnd {
  cycle: number
  botsActions: BotActionsPersistence[]
}
export interface BotActionsPersistence {
  cardDeck: CardDeckPersistence
  technologies: TechnologiesPersistence
}
export interface CardDeckPersistence {
  active?: number
  deck: number[]
  reserve: number[]
  discard: number[]
  gainProtocolCardReasons?: GainProtocolCardReason[]
}
export interface TechnologiesPersistence {
  civil: Technology[]
  military: Technology[]
}
