/**
 * Get order of player and bots depending on human start player.
 * @param playerCount Player count
 * @param botCount Bot count
 * @param startPlayer Start player (human or bot)
 * @returns Player order
 */
export default function(playerCount: number, botCount: number, startPlayer: number) : PlayerOrder[] {
  const result : PlayerOrder[] = []
  for (let player=startPlayer; player<=playerCount; player++) {
    result.push({player})
  }
  for (let bot=startPlayer-playerCount; bot<=botCount; bot++) {
    if (bot > 0) {
      result.push({bot})
    }
  }
  for (let player=1; player<startPlayer; player++) {
    if (player <= playerCount) {
      result.push({player})
    }
  }
  for (let bot=1; bot<=startPlayer-playerCount-1; bot++) {
    result.push({bot})
  }
  return result
}

export class PlayerOrder {
  readonly player?: number
  readonly bot?: number
}
