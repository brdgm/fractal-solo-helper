import { Cycle, Turn } from '@/store/state';

export default function (params?: MockCycleParams) : Cycle {
  return {
    cycle: params?.cycle ?? 1,
    startPlayer: params?.startPlayer ?? 1,
    turns: params?.turns ?? []
  }
}

export interface MockCycleParams {
  cycle? : number
  startPlayer?: number
  turns? : Turn[]
}
