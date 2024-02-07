import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from 'brdgm-commons/src/util/router/getIntRouteParam'
import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColor from './getPlayerColor'
import BotActions from '@/services/BotActions'
import getBotActions from './getBotActions'

export default class NavigationState {

  readonly cycle : number
  readonly turn : number
  readonly player : number
  readonly bot : number
  readonly action : number
  readonly playerCount : number
  readonly botCount : number
  readonly playerColor : PlayerColor
  readonly botActions? : BotActions

  public constructor(route : RouteLocation, state : State) {    
    this.cycle = getIntRouteParam(route, 'cycle')
    this.turn = getIntRouteParam(route, 'turn')
    this.player = getIntRouteParam(route, 'player')
    this.bot = getIntRouteParam(route, 'bot')
    this.action = getIntRouteParam(route, 'action')

    const playerSetup = state.setup.playerSetup
    this.playerCount = playerSetup.playerCount
    this.botCount = playerSetup.botCount
    this.playerColor = getPlayerColor(playerSetup, this.player, this.bot)
    
    if (this.bot > 0 && this.turn > 0) {
      this.botActions = getBotActions(state, this.cycle, this.turn, this.bot, this.action)
    }
  }

}
