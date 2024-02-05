import PlayerColor from '@/services/enum/PlayerColor';
import { PlayerSetup } from '@/store/state';

/**
 * Get color code for player color.
 * @param playerSetup Player setup
 * @param player Player number
 * @param bot Bot number
 * @returns Color code
 */
export default function getPlayerColor(playerSetup: PlayerSetup, player: number, bot: number) : PlayerColor {
  const { playerColors, playerCount } = playerSetup
  let colorCode : PlayerColor
  if (player > 0) {
    colorCode = playerColors[player-1]
  }
  else {
    colorCode = playerColors[bot+playerCount-1]
  }
  if (!colorCode) {
    colorCode = PlayerColor.RED  // fallback
  }
  return colorCode
}
