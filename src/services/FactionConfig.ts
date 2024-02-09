import Action from './enum/Action'
import ColonyType from './enum/ColonyType'
import Faction from './enum/Faction'
import Phase from './enum/Phase'
import UnitType from './enum/UnitType'

export default interface FactionConfig {
  faction: Faction
  startingColony: ColonyType
  startingUnits: UnitType[]
  additionalProtocolCards?: number
  generalAbility: (Action|Phase)[],
  generalAbilitySetup?: boolean
  civilTechnologyAbility: Record<number,(Action|Phase)[]>
}
