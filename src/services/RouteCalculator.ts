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
  readonly action? : number

  constructor(params:{cycle: number, turn?: number, player?: number, bot?: number, action?: number}) {    
    this.cycle = params.cycle
    this.turn = params.turn ?? MAX_TURN  // when called outside a turn
    this.player = params.player
    this.bot = params.bot
    this.action = params.action
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
    const currentStep = steps[currentStepIndex]
    if (currentStep.bot && this.action == 1) {
      return routeTo(currentStepIndex, currentStep, 2)
    } 
    const nextStep = steps[currentStepIndex+1]
    if (!nextStep) {
      return `/cycle/${this.cycle}/conflict`
    }
    return routeTo(currentStepIndex+1, nextStep, 1)
  }

  /**
   * Get route to previous step in cycle.
   * If this is the first turn in cycle, returns route to cycle income.
   */
  public getBackRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.cycle, this.turn, this.getFirstPlayer(state))
    const currentStepIndex = steps.findIndex(item => item.cycle==this.cycle && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const currentStep = steps[currentStepIndex]
    if (currentStep.bot && this.action == 2) {
      return routeTo(currentStepIndex, currentStep, 1)
    } 
    const previousStep = steps[currentStepIndex-1]
    if (!previousStep) {
      return `/cycle/${this.cycle}/income`
    }
    return routeTo(currentStepIndex-1, previousStep, 2)
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getFirstTurnRouteTo(state: State) : string {
    const firstPlayer = this.getFirstPlayer(state)
    const playerCount = state.setup.playerSetup.playerCount
    const botCount = state.setup.playerSetup.botCount
    const playerOrder = getPlayerOrder(playerCount, botCount, firstPlayer)
    return routeTo(0, {cycle:this.cycle,turn:1,player:playerOrder[0].player,bot:playerOrder[0].bot}, 1)
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getLastTurnRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.cycle, this.turn, this.getFirstPlayer(state))
    const lastStep = steps[steps.length-1]
    if (lastStep) {
      return routeTo(steps.length-1, lastStep, 2)
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
function routeTo(stepIndex: number, step: Step, action: number) : string {
  let stateIndex = (stepIndex+1) * 10
  if (step.bot) {
    stateIndex += action
    return `/cycle/${step.cycle}/turn/${step.turn}/bot/${step.bot}/action/${action}/state/${stateIndex}`
  }
  else {
    return `/cycle/${step.cycle}/turn/${step.turn}/player/${step.player}/state/${stateIndex}`
  }
}

class Step {
  cycle?: number
  turn?: number
  player?: number
  bot?: number
}
