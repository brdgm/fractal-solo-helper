import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColor from '@/util/getPlayerColor'
import { expect } from 'chai'
import mockState from '../helper/mockState'

describe('util/getPlayerColor', () => {
  it('playerColor', () => {
    const playerSetup = mockState({
      playerColors: [PlayerColor.GREEN,PlayerColor.BLUE,PlayerColor.YELLOW,PlayerColor.RED],
      playerCount: 2,
      botCount: 1
    }).setup.playerSetup
    expect(getPlayerColor(playerSetup, 1, 0)).to.eq(PlayerColor.GREEN)
    expect(getPlayerColor(playerSetup, 2, 0)).to.eq(PlayerColor.BLUE)
    expect(getPlayerColor(playerSetup, 0, 1)).to.eq(PlayerColor.YELLOW)
    expect(getPlayerColor(playerSetup, 0, 99)).to.eq(PlayerColor.RED)
  })
})
