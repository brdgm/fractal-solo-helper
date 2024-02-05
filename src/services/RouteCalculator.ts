import { State } from '@/store/state'
import getPlayerOrder from '@/util/getPlayerOrder'
import getTurnOrder, { MAX_TURN } from '@/util/getTurnOrder'

/**
 * Calculate routes for next/back respecting "passed" state of players/bots.
 */
export default class RouteCalculator {

  readonly cycle : number
  readonly turn : number
  readonly player? : number
  readonly bot? : number

  constructor(params:{cycle: number, turn?: number, player?: number, bot?: number}) {    
    this.cycle = params.cycle
    this.turn = params.turn ?? MAX_TURN  // when called outside a turn
    this.player = params.player
    this.bot = params.bot
  }

  /**
   * Get route to next step in cycle.
   * If all have passed, returns route to end of cycle.
   */
  public getNextRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.cycle, this.turn, this.getFirstPlayer(state))
    const currentStepIndex = steps.findIndex(item => item.cycle==this.cycle && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const nextStep = steps[currentStepIndex+1]
    if (!nextStep) {
      return `/cycle/${this.cycle}/end`
    }
    return routeTo(nextStep)
  }

  /**
   * Get route to previous step in cycle.
   * If this is the first turn in cycle, returns route to end of previous cycle (or empty route in first cycle).
   */
  public getBackRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.cycle, this.turn, this.getFirstPlayer(state))
    const currentStepIndex = steps.findIndex(item => item.cycle==this.cycle && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const previousStep = steps[currentStepIndex-1]
    if (!previousStep) {
      if (this.cycle > 1) {
        return `/cycle/${this.cycle-1}/end`
      }
      else {
        return ''
      }
    }
    return routeTo(previousStep)
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getFirstTurnRouteTo(state: State) : string {
    const firstPlayer = this.getFirstPlayer(state)
    const playerCount = state.setup.playerSetup.playerCount
    const botCount = state.setup.playerSetup.botCount
    const playerOrder = getPlayerOrder(playerCount, botCount, firstPlayer)
    return routeTo({cycle:this.cycle,turn:1,player:playerOrder[0].player,bot:playerOrder[0].bot})
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getLastTurnRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.cycle, this.turn, this.getFirstPlayer(state))
    const lastStep = steps[steps.length-1]
    if (lastStep) {
      return routeTo(lastStep)
    }
    else {
      return ''
    }
  }

  /**
   * Determine first player from previous round (human players may claim first player marker).
   */
  private getFirstPlayer(state: State) : number {
    const cycleData = state.cycles.find(item => item.cycle == this.cycle)
    if (cycleData) {
      return cycleData.startPlayer
    }
    return 1 // fallback
  }

}

/**
 * Build route to player/bot step
 */
function routeTo(step: Step) : string {
  if (step.bot) {
    return `/cycle/${step.cycle}/turn/${step.turn}/bot/${step.bot}`
  }
  else {
    return `/cycle/${step.cycle}/turn/${step.turn}/player/${step.player}`
  }
}

class Step {
  cycle?: number
  turn?: number
  player?: number
  bot?: number
}
