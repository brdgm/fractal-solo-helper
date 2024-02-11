import findMandatory from 'brdgm-commons/src/util/map/findMandatory'
import UnitType from './enum/UnitType'
import ColonyType from './enum/ColonyType'
import FactionConfig from './FactionConfig'
import Faction from './enum/Faction'
import Action from './enum/Action'
import Phase from './enum/Phase'

/**
 * Faction configurations.
 */
const factionConfigs : FactionConfig[] = [
  {
    faction: Faction.BORROKA,
    startingColony: ColonyType.IMPERIAL,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP],
    generalAbility: [Action.ADVANCE,Action.MOVEMENT_SINGLE],
    civilTechnologyAbility: {
      3: [Action.ACTION_CARD,Action.LOSE_INFLUENCE_ACTION_CARD],
      6: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY],
      9: [Action.ADVANCE,Action.MOVEMENT_SINGLE]
    }
  },
  {
    faction: Faction.DELVERAR,
    startingColony: ColonyType.SCIENTIFIC,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP],
    generalAbility: [Action.ADVANCE,Action.MOVEMENT_SINGLE],
    generalAbilitySetup: true,
    civilTechnologyAbility: {
      3: [Action.COLONIZE],
      6: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY],
      9: [Phase.TRANSITION_2]
    }
  },
  {
    faction: Faction.EXODIAN,
    startingColony: ColonyType.IMPERIAL,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP],
    generalAbility: [Action.ADVANCE,Action.MOVEMENT_SINGLE],
    civilTechnologyAbility: {
      3: [Action.COLONIZE],
      6: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY],
      9: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY]
    }
  },
  {
    faction: Faction.GORIA,
    startingColony: ColonyType.PRODUCTIVE,
    startingUnits: [UnitType.INFANTRY,UnitType.LIGHTSHIP],
    additionalProtocolCards: 1,
    generalAbility: [Phase.CONFLICT],
    generalAbilitySetup: true,
    civilTechnologyAbility: {
      3: [Action.ADVANCE,Action.MOVEMENT_SINGLE,Phase.PENDULUM_1],
      6: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY],
      9: [Phase.TRANSITION_2]
    }
  },
  {
    faction: Faction.SAURA,
    startingColony: ColonyType.MILITARY,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP],
    generalAbility: [Phase.CONFLICT],
    civilTechnologyAbility: {
      3: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY,Phase.PENDULUM_1],
      6: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY],
      9: [Action.MOVEMENT_SINGLE,Phase.PENDULUM_1]
    }
  },
  {
    faction: Faction.TXINGUR,
    startingColony: ColonyType.MILITARY,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP],
    generalAbility: [Action.ADVANCE,Action.RECRUIT],
    civilTechnologyAbility: {
      3: [Phase.CONFLICT],
      6: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY],
      9: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY]
    }
  },
  {
    faction: Faction.VAX_117,
    startingColony: ColonyType.SCIENTIFIC,
    startingUnits: [UnitType.INFANTRY,UnitType.INFANTRY,UnitType.LIGHTSHIP,UnitType.LIGHTSHIP],
    generalAbility: [Action.ADVANCE,Action.MOVEMENT_SINGLE,Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY],
    civilTechnologyAbility: {
      3: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY],
      6: [Action.RESEARCH_CIVIL,Action.RESEARCH_MILITARY],
      9: [Phase.TRANSITION_2]
    }
  }
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
