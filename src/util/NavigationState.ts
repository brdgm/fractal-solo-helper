import { Setup, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColor from './getPlayerColor'
import BotActions from '@/services/BotActions'
import getBotsActions from './getBotsActions'
import CampaignOption from '@/services/enum/CampaignOption'

export default class NavigationState {

  readonly cycle : number
  readonly turn : number
  readonly player : number
  readonly bot : number
  readonly action : number
  readonly stateIndex : number
  readonly playerCount : number
  readonly botCount : number
  readonly playerColor : PlayerColor
  readonly cycleCount : number
  readonly botsActions : BotActions[]
  readonly botActions? : BotActions
  readonly botsActionReadonly

  public constructor(route : RouteLocation, state : State) {
    this.cycle = getIntRouteParam(route, 'cycle')
    this.turn = getIntRouteParam(route, 'turn')
    this.player = getIntRouteParam(route, 'player')
    this.bot = getIntRouteParam(route, 'bot')
    this.action = getIntRouteParam(route, 'action')
    this.stateIndex = getStateIndex(route)

    const playerSetup = state.setup.playerSetup
    this.playerCount = playerSetup.playerCount
    this.botCount = playerSetup.botCount
    this.playerColor = getPlayerColor(playerSetup, this.player, this.bot)
    this.cycleCount = getCycleCount(state.setup)

    this.botsActions = getBotsActions(state, this.cycle, this.stateIndex, isCheckConflictPhase(route), isCheckCycleEnd(route))
    if (this.bot > 0 && this.turn > 0) {
      this.botActions = this.botsActions.find(item => item.bot == this.bot)
      if (this.botActions && this.action == 1) {
        // draw protocol card for new turn
        this.botActions.cardDeck.draw()
      }
    }
    this.botsActionReadonly = isBotsActionReadonly(route)
  }

}

/**
 * State Index from URL. For views after action phase use max number.
 */
function getStateIndex(route : RouteLocation) : number {
  if (isCycleConflict(route) || isCycleEnd(route) || isCycleTransition(route)) {
    return Number.MAX_VALUE
  }
  return getIntRouteParam(route, 'stateIndex')
}

/**
 * Bot actions are only persisted during player/bot turns and during conflict.
 */
function isBotsActionReadonly(route : RouteLocation) : boolean {
  return !isTurn(route) && !isCycleConflict(route) && !isCycleEnd(route)
}

/**
 * Cycle end takes place after the conflict phase.
 */
function isCheckConflictPhase(route : RouteLocation) : boolean {
  return isCycleEnd(route)
}

/**
 * Transition phase takes place after cycle end.
 */
function isCheckCycleEnd(route : RouteLocation) : boolean {
  return isCycleTransition(route)
}

function isTurn(route : RouteLocation) {
  return route.name == 'TurnPlayer' || route.name == 'TurnBot'
}
function isCycleConflict(route : RouteLocation) {
  return route.name == 'CycleConflict'
}
function isCycleEnd(route : RouteLocation) {
  return route.name == 'CycleEnd'
}
function isCycleTransition(route : RouteLocation) {
  return route.name == 'CycleTransition'
}

function getCycleCount(setup : Setup) : number {
  const campaignOptions = setup.campaignOptions ?? []
  if (campaignOptions.includes(CampaignOption.RUINS_OF_EMPIRE)) {
    return 2
  }
  if (campaignOptions.includes(CampaignOption.FALLEN_GALAXY)) {
    return 6
  }
  return 4
}
