import PlayerColor from '@/services/enum/PlayerColor';

/**
 * Get color code for player color.
 * @param playerColor Player color
 * @returns Color code
 */
export default function(playerColor: PlayerColor) : string {
  switch (playerColor) {
    case PlayerColor.RED:
      return '#da0e18'
    case PlayerColor.BLUE:
      return '#48b3e7'
    case PlayerColor.GREEN:
      return '#00a979'
    case PlayerColor.YELLOW:
      return 'gold'
    default:
      throw new Error(`Invalid player color: ${playerColor}.`)
  }
}
