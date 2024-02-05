import { State, Turn } from "@/store/state"
import getPlayerOrder, { PlayerOrder } from "./getPlayerOrder"

/**
 * Generate list of all player/bot turns - leaving out steps after player/bot has passed.
 * Player order is respected, starting with the start player.
 * @param state State
 * @param cycle Cycle to build turn order for
 * @param turn Current turn
 * @param startPlayer Start player
 */
export default function(state: State, cycle: number, turn: number, startPlayer: number) : TurnOrder[] {
  const playerCount = state.setup.playerSetup.playerCount
  const botCount = state.setup.playerSetup.botCount
  const playerOrder = getPlayerOrder(playerCount, botCount, startPlayer)
  
  const currentCycle = state.cycles.find(item => item.cycle==cycle)
  const turns = currentCycle?.turns ?? []
  const steps : TurnOrder[] = []

  let invalidTurn = false
  for (let turnNo=1; turnNo<=turn+1; turnNo++) {
    playerOrder.forEach(player => {
      if (!playerHasPassedBeforeTurn(turns, cycle, turnNo, player)) {
        if (turnNo > MAX_TURN) {
          // not a valid round as not all have passed in time, return empty list of steps
          invalidTurn = true
        }
        if (player.player) {
          steps.push({cycle, turn:turnNo, player:player.player})
        }
        else if (player.bot) {
          steps.push({cycle, turn:turnNo, bot:player.bot})
        }
      }
    })
  }
  if (invalidTurn) {
    return []
  }
  else {
    return steps
  }
}

function playerHasPassedBeforeTurn(turns: Turn[], cycle: number, turnNo: number, player : PlayerOrder) : boolean {
  return turns.find(item => item.cycle==cycle && item.turn<turnNo
    && item.player==player.player && item.bot==player.bot && item.passed) != undefined
}

export class TurnOrder {
  readonly cycle: number
  readonly turn: number
  readonly player?: number
  readonly bot?: number

  private constructor(cycle: number, turn: number, player?: number, bot?: number) {
    this.cycle = cycle
    this.turn = turn
    this.player = player
    this.bot = bot
  }
}

export const MAX_TURN = 99
