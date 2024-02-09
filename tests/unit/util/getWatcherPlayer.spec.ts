import { expect } from 'chai'
import mockState from '../helper/mockState'
import mockCycle from '../helper/mockCycle'
import getWatcherPlayer from '@/util/getWatcherPlayer'

describe('util/getWatcherPlayer', () => {
  it('player', () => {
    const state = mockState({playerCount:1, botCount:2, cycles:[
      mockCycle({cycle:1, turns:[
        {stateIndex: 10, cycle:1, turn:1, player:1, botsActions:[]},
        {stateIndex: 21, cycle:1, turn:1, bot:1, action:1, botsActions:[]},
        {stateIndex: 22, cycle:1, turn:1, bot:1, action:2, botsActions:[]},
        {stateIndex: 31, cycle:1, turn:1, bot:2, action:1, botsActions:[]},
        {stateIndex: 32, cycle:1, turn:1, bot:2, action:2, botsActions:[]},
        {stateIndex: 40, cycle:1, turn:2, player:1, passed: true, botsActions:[]},
        {stateIndex: 51, cycle:1, turn:2, bot:1, action:1, botsActions:[]},
        {stateIndex: 52, cycle:1, turn:2, bot:1, action:2, passed:true, botsActions:[]},
        {stateIndex: 61, cycle:1, turn:2, bot:2, action:1, botsActions:[]},
        {stateIndex: 62, cycle:1, turn:2, bot:2, action:2, passed: true, botsActions:[]}
      ]})
    ]})
    expect(getWatcherPlayer(state, 1)).to.eql({player:1,bot:undefined})
    expect(getWatcherPlayer(state, 1, 40)).to.eql({})
  })

  it('bot', () => {
    const state = mockState({playerCount:1, botCount:2, cycles:[
      mockCycle({cycle:1, turns:[
        {stateIndex: 10, cycle:1, turn:1, player:1, botsActions:[]},
        {stateIndex: 21, cycle:1, turn:1, bot:1, action:1, botsActions:[]},
        {stateIndex: 22, cycle:1, turn:1, bot:1, action:2, botsActions:[]},
        {stateIndex: 31, cycle:1, turn:1, bot:2, action:1, botsActions:[]},
        {stateIndex: 32, cycle:1, turn:1, bot:2, action:2, passed:true, botsActions:[]},
        {stateIndex: 40, cycle:1, turn:2, player:1, passed: true, botsActions:[]},
        {stateIndex: 51, cycle:1, turn:2, bot:1, action:1, botsActions:[]},
        {stateIndex: 52, cycle:1, turn:2, bot:1, action:2, passed:true, botsActions:[]},
      ]})
    ]})
    expect(getWatcherPlayer(state, 1)).to.eql({player:undefined,bot:2})
  })

  it('none', () => {
    const state = mockState({playerCount:1, botCount:2, cycles:[
      mockCycle({cycle:1, turns:[
        {stateIndex: 10, cycle:1, turn:1, player:1, botsActions:[]},
        {stateIndex: 21, cycle:1, turn:1, bot:1, action:1, botsActions:[]},
        {stateIndex: 22, cycle:1, turn:1, bot:1, action:2, botsActions:[]},
        {stateIndex: 31, cycle:1, turn:1, bot:2, action:1, botsActions:[]}
      ]})
    ]})
    expect(getWatcherPlayer(state, 1)).to.eql({})
  })
})
