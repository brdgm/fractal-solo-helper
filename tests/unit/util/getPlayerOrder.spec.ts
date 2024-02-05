import getPlayerOrder from '@/util/getPlayerOrder'
import { expect } from 'chai'

describe('util/getPlayerOrder', () => {
  it('1player-1bot', () => {
    expect(getPlayerOrder(1,1,1)).to.eql([
      {player:1},
      {bot:1}
    ])
  })

  it('2player-2bot-firstplayer2', () => {
    expect(getPlayerOrder(2,2,2)).to.eql([
      {player:2},
      {bot:1},
      {bot:2},
      {player:1}
    ])
  })

  it('2player-2bot-firstplayer3', () => {
    expect(getPlayerOrder(2,2,3)).to.eql([
      {bot:1},
      {bot:2},
      {player:1},
      {player:2}
    ])
  })

  it('2player-2bot-firstplayer4', () => {
    expect(getPlayerOrder(2,2,4)).to.eql([
      {bot:2},
      {player:1},
      {player:2},
      {bot:1}
    ])
  })
})
