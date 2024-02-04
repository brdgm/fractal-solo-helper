import Faction from '@/services/enum/Faction';
import { PlayerSetup } from '@/store/state';

/**
 * Get faction assigned to bot.
 * @param playerSetup Player setup
 * @param bot Bot number
 * @returns Faction
 */
export default function getBotFaction(playerSetup: PlayerSetup, bot: number) : Faction {
  const botFaction = playerSetup.botFactions[bot - 1]
  if (botFaction) {
    return botFaction
  }
  return Faction.SAURA
}
