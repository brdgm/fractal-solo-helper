import ColonyType from "./enum/ColonyType";
import Faction from "./enum/Faction";
import UnitType from "./enum/UnitType";

export default interface FactionConfig {
  faction: Faction
  startingColony: ColonyType
  startingUnits: UnitType[]
  additionalProtocolCards?: number
}
