import { expect } from 'chai'
import mockState from '../helper/mockState'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import getBotDifficultyLevel from '@/util/getBotDifficultyLevel'

describe('util/getBotDifficultyLevel', () => {
  it('getBotDifficultyLevel', () => {
    const state = mockState({botDifficultyLevels:[DifficultyLevel.HARD,DifficultyLevel.IMPOSSIBLE]})

    expect(getBotDifficultyLevel(state.setup.playerSetup, 1)).to.eq(DifficultyLevel.HARD)
    expect(getBotDifficultyLevel(state.setup.playerSetup, 2)).to.eq(DifficultyLevel.IMPOSSIBLE)
    expect(getBotDifficultyLevel(state.setup.playerSetup, 3)).to.eq(DifficultyLevel.NORMAL)
  })
})
