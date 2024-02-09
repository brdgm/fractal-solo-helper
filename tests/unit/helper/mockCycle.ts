import { ConflictPhase, Cycle, Turn } from '@/store/state';

export default function (params?: MockCycleParams) : Cycle {
  return {
    cycle: params?.cycle ?? 1,
    startPlayer: params?.startPlayer ?? 1,
    turns: params?.turns ?? [],
    conflictPhase: params?.conflictPhase
  }
}

export interface MockCycleParams {
  cycle? : number
  startPlayer?: number
  turns? : Turn[]
  conflictPhase?: ConflictPhase
}
