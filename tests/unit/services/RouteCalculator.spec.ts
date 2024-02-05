import RouteCalculator from '@/services/RouteCalculator'
import { expect } from 'chai'
import mockCycle from '../helper/mockCycle'
import mockState from '../helper/mockState'

describe('services/RouteCalculator', () => {
  it('getNextRouteTo-cycle1-turn1-player', () => {
    const routeCalculator = new RouteCalculator({cycle:1, turn:1, player:1})

    const state = mockState({playerCount:1, botCount:2})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/cycle/1/turn/1/bot/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/cycle/1/income')
  })

  it('getNextRouteTo-cycle1-turn1-bot1', () => {
    const routeCalculator = new RouteCalculator({cycle:1, turn:1, bot:1})

    const state = mockState({playerCount:1, botCount:2})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/cycle/1/turn/1/bot/2')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/cycle/1/turn/1/player/1')
  })

  it('getNextRouteTo_cycle1-turn1-bot2', () => {
    const routeCalculator = new RouteCalculator({cycle:1, turn:1, bot:2})
    
    const state = mockState({playerCount:1, botCount:2})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/cycle/1/turn/2/player/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/cycle/1/turn/1/bot/1')
  })

  it('getNextRouteTo_cycle1-turn1-bot2-playerpassed', () => {
    const routeCalculator = new RouteCalculator({cycle:1, turn:1, bot:2})

    const state = mockState({playerCount:1, botCount:2, cycles:[
      mockCycle({cycle:1, turns:[{cycle:1, turn:1, player:1, passed:true}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/cycle/1/turn/2/bot/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/cycle/1/turn/1/bot/1')
  })

  it('getNextRouteTo_cycle1-turn1-bot2-playerpassed-bot1passed', () => {
    const routeCalculator = new RouteCalculator({cycle:1, turn:1, bot:2})

    const state = mockState({playerCount:1, botCount:2, cycles:[
      mockCycle({cycle:1, turns:[{cycle:1, turn:1, player:1, passed:true},
        {cycle:1, turn:1, bot:1, passed:true}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/cycle/1/turn/2/bot/2')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/cycle/1/turn/1/bot/1')
  })

  it('getNextRouteTo_cycle1-turn1-bot2-playerpassed-bot1passed-bot2passed', () => {
    const routeCalculator = new RouteCalculator({cycle:1, turn:1, bot:2})

    const state = mockState({playerCount:1, botCount:2, cycles:[
      mockCycle({cycle:1, turns:[{cycle:1, turn:1, player:1, passed:true},
        {cycle:1, turn:1, bot:1, passed:true},
        {cycle:1, turn:1, bot:2, passed:true}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/cycle/1/end')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/cycle/1/turn/1/bot/1')
  })

  it('getNextRouteTo_cycle7-turn1-bot2-playerpassed-bot1passed-bot2passed', () => {
    const routeCalculator = new RouteCalculator({cycle:7, turn:1, bot:2})

    const state = mockState({playerCount:1, botCount:2, cycles:[
      mockCycle({cycle:7, turns:[{cycle:7, turn:1, player:1, passed:true},
        {cycle:7, turn:1, bot:1, passed:true},
        {cycle:7, turn:1, bot:2, passed:true}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/cycle/7/end')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/cycle/7/turn/1/bot/1')
  })

  it('getFirstTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({cycle:1})

    const state = mockState({playerCount:1, botCount:2})
    expect(routeCalculator.getFirstTurnRouteTo(state)).to.eq('/cycle/1/turn/1/player/1')
  })

  it('getLastTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({cycle:1})

    const state = mockState({playerCount:1, botCount:2, cycles:[
      mockCycle({cycle:1, turns:[{cycle:1, turn:1, player:1, passed:true},
        {cycle:1, turn:1, bot:1, passed:true},
        {cycle:1, turn:1, bot:2, passed:true}]})
  ]})
    expect(routeCalculator.getLastTurnRouteTo(state)).to.eq('/cycle/1/turn/1/bot/2')
  })

  it('getLastTurnRouteTo-empty', () => {
    const routeCalculator = new RouteCalculator({cycle:1})

    const state = mockState({playerCount:1, botCount:2})
    expect(routeCalculator.getLastTurnRouteTo(state)).to.eq('')
  })
})
