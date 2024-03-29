import PlayerColor from '@/services/enum/PlayerColor'
import Faction from '@/services/enum/Faction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { CardDeckPersistence, Cycle, State, TechnologiesPersistence } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      playerSetup: {
        playerCount: params?.playerCount ?? 1,
        botCount: params?.botCount ?? 1,
        playerColors: params?.playerColors ?? [PlayerColor.RED, PlayerColor.BLUE, PlayerColor.GREEN, PlayerColor.YELLOW],
        botFactions: params?.botFactions ?? [],
        botDifficultyLevels: params?.botDifficultyLevels ?? []
      },
      initialBotCardDecks: params?.initialBotCardDecks,
      initialBotTechnologies: params?.initialBotTechnologies
    },
    cycles: params?.cycles ?? []
  }
}

export interface MockStateParams {
  playerCount?: number
  botCount?: number
  playerColors?: PlayerColor[]
  botFactions?: Faction[]
  botDifficultyLevels?: DifficultyLevel[]
  cycles?: Cycle[]
  initialBotCardDecks?: CardDeckPersistence[]
  initialBotTechnologies?: TechnologiesPersistence[]
}
