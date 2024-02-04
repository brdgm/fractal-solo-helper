import DifficultyLevel from '@/services/enum/DifficultyLevel';
import { PlayerSetup } from '@/store/state';

/**
 * Get difficulty level assigned to bot.
 * @param playerSetup Player setup
 * @param bot Bot number
 * @returns Difficulty level
 */
export default function getBotDifficultyLevel(playerSetup: PlayerSetup, bot: number) : DifficultyLevel {
  const botDifficultyLevel = playerSetup.botDifficultyLevels[bot - 1]
  if (botDifficultyLevel) {
    return botDifficultyLevel
  }
  return DifficultyLevel.NORMAL
}
