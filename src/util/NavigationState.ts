import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from 'brdgm-commons/src/util/router/getIntRouteParam'

export default class NavigationState {

  readonly cycle : number
  readonly turn : number

  public constructor(route : RouteLocation, state : State) {    
    this.cycle = getIntRouteParam(route, 'cycle')
    this.turn = getIntRouteParam(route, 'turn')
  }

}
