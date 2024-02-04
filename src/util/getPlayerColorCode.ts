import PlayerColor from '@/services/enum/PlayerColor';

/**
 * Get color code for player color.
 * @param playerColor Player color
 * @returns Color code
 */
export default function(playerColor: PlayerColor) : string {
  switch (playerColor) {
    case PlayerColor.RED:
      return '#f33'
    case PlayerColor.BLUE:
      return '#77f'
    case PlayerColor.GREEN:
      return '#0a0'
    case PlayerColor.YELLOW:
      return 'gold'
    default:
      throw new Error(`Invalid player color: ${playerColor}.`)
  }
}
