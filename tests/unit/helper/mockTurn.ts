import { BotActionsPersistence, Turn } from '@/store/state'

export default function mockTurn(params?: MockTurnParams) : Turn {
  return {
    stateIndex: params?.stateIndex ?? 0,
    cycle: params?.cycle ?? 1,
    turn: params?.turn ?? 1,
    player: params?.player,
    bot: params?.bot,
    action: params?.action,
    passed: params?.passed,
    botsActions: params?.botsActions ?? []
  }
}

export interface MockTurnParams {
  stateIndex?: number
  cycle?: number
  turn?: number
  player?: number
  bot?: number
  action?: number
  passed?: boolean
  botsActions?: BotActionsPersistence[]
}
