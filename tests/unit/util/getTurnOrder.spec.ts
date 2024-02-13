import getTurnOrder from '@/util/getTurnOrder'
import { expect } from 'chai'
import mockCycle from '../helper/mockCycle'
import mockState from '../helper/mockState'

describe('util/getTurnOrder', () => {
  it('cycle1-turn2', () => {
    const state = mockState({playerCount:1, botCount:2})
    expect(getTurnOrder(state, 1, 2, 1)).to.eql([
      {cycle:1, turn:1, player:1},
      {cycle:1, turn:1, bot:1},
      {cycle:1, turn:1, bot:2},
      {cycle:1, turn:2, player:1},
      {cycle:1, turn:2, bot:1},
      {cycle:1, turn:2, bot:2},
      {cycle:1, turn:3, player:1},
      {cycle:1, turn:3, bot:1},
      {cycle:1, turn:3, bot:2}
    ])
  })

  it('cycle1-turn2-passed', () => {
    const state = mockState({playerCount:1, botCount:2, cycles:[
      mockCycle({cycle:1, turns:[
        {cycle:1,turn:1,player:1},
        {cycle:1,turn:1,bot:1,passed:true},
        {cycle:1,turn:1,bot:2},
        {cycle:1,turn:2,player:1,passed:true},
        {cycle:1,turn:2,bot:2}
      ]})
    ]})
    expect(getTurnOrder(state, 1, 2, 1)).to.eql([
      {cycle:1, turn:1, player:1},
      {cycle:1, turn:1, bot:1},
      {cycle:1, turn:1, bot:2},
      {cycle:1, turn:2, player:1},
      {cycle:1, turn:2, bot:2},
      {cycle:1, turn:3, bot:2}
    ])
  })

  it('cycle1-turn2-passed-playerorder', () => {
    const state = mockState({playerCount:2, botCount:2, cycles:[
      mockCycle({cycle:1, turns:[
        {cycle:1,turn:1,player:2},
        {cycle:1,turn:1,bot:1,passed:true},
        {cycle:1,turn:1,bot:2},
        {cycle:1,turn:1,player:1},
        {cycle:1,turn:2,player:2},
        {cycle:1,turn:2,bot:2},
        {cycle:1,turn:2,player:1,passed:true}
      ]})
    ]})
    expect(getTurnOrder(state, 1, 2, 2)).to.eql([
      {cycle:1, turn:1, player:2},
      {cycle:1, turn:1, bot:1},
      {cycle:1, turn:1, bot:2},
      {cycle:1, turn:1, player:1},
      {cycle:1, turn:2, player:2},
      {cycle:1, turn:2, bot:2},
      {cycle:1, turn:2, player:1},
      {cycle:1, turn:3, player:2},
      {cycle:1, turn:3, bot:2}
    ])
  })
})
