import Action from './enum/Action'
import Behavior from './enum/Behavior'
import ColonyType from './enum/ColonyType'
import ConditionalActivation from './enum/ConditionalActivation'
import LivingStormDirection from './enum/LivingStormDirection'
import LivingStormOrientation from './enum/LivingStormOrientation'
import PlayerColor from './enum/PlayerColor'
import UnitType from './enum/UnitType'

export default interface Card {
  id: number
  actions: CardAction[]
  behavior: Behavior[]
  triggerSlots: number[]
  behaviorSlot: number
  livingStormDirection: LivingStormDirection
  livingStormOrientation: LivingStormOrientation
  playerPriority?: PlayerColor[]
  playerPriorityWatcherToken?: boolean
  unitPriority: UnitType[]
  colonyPriority: ColonyType[]
}

export interface CardAction {
  actions: Action[]
  conditionalActivation?: ConditionalActivation
  actionCardSlot?: number
}
