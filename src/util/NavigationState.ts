import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from 'brdgm-commons/src/util/router/getIntRouteParam'
import PlayerColor from '@/services/enum/PlayerColor'

export default class NavigationState {

  readonly cycle : number
  readonly turn : number
  readonly player : number
  readonly bot : number
  readonly playerCount : number
  readonly botCount : number
  readonly playerColor : PlayerColor

  public constructor(route : RouteLocation, state : State) {    
    this.cycle = getIntRouteParam(route, 'cycle')
    this.turn = getIntRouteParam(route, 'turn')
    this.player = getIntRouteParam(route, 'player')
    this.bot = getIntRouteParam(route, 'bot')

    const playerSetup = state.setup.playerSetup
    this.playerCount = playerSetup.playerCount
    this.botCount = playerSetup.botCount
    this.playerColor = this.getPlayerColor(playerSetup.playerColors)
  }

  private getPlayerColor(playerColors : PlayerColor[]) : PlayerColor {
    let colorCode : PlayerColor
    if (this.player > 0) {
      colorCode = playerColors[this.player-1]
    }
    else {
      colorCode = playerColors[this.bot-this.playerCount-1]
    }
    if (!colorCode) {
      colorCode = PlayerColor.RED
    }
    return colorCode
  }

}
