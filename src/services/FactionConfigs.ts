import findMandatory from 'brdgm-commons/src/util/map/findMandatory'
import UnitType from './enum/UnitType'
import ColonyType from './enum/ColonyType'
import FactionConfig from './FactionConfig'
import Faction from './enum/Faction'

/**
 * Faction configurations.
 */
const factionConfigs : FactionConfig[] = [
  {
    faction: Faction.BORROKA,
    startingColony: ColonyType.IMPERIAL,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP]
  },
  {
    faction: Faction.DELVERAR,
    startingColony: ColonyType.SCIENTIFIC,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP]
  },
  {
    faction: Faction.EXODIAN,
    startingColony: ColonyType.IMPERIAL,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP]
  },
  {
    faction: Faction.GORIA,
    startingColony: ColonyType.PRODUCTIVE,
    startingUnits: [UnitType.INFANTRY,UnitType.LIGHTSHIP],
    additionalProtocolCards: 1
  },
  {
    faction: Faction.SAURA,
    startingColony: ColonyType.MILITARY,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP]
  },
  {
    faction: Faction.TXINGUR,
    startingColony: ColonyType.MILITARY,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP]
  },
  {
    faction: Faction.VAX_117,
    startingColony: ColonyType.SCIENTIFIC,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP]
  },
]

const factionConfigsMap = new Map<Faction,FactionConfig>()
factionConfigs.forEach(factionConfig => factionConfigsMap.set(factionConfig.faction, factionConfig))

export default {

  /**
   * Get faction config
   * @param faction Faction
   * @returns Faction config
   */
  get(faction: Faction) : FactionConfig {
    return findMandatory(factionConfigsMap, faction)
  }

}
