import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import ConditionalActivation from './enum/ConditionalActivation'
import Behavior from './enum/Behavior'
import LivingStormDirection from './enum/LivingStormDirection'
import LivingStormOrientation from './enum/LivingStormOrientation'
import Action from './enum/Action'
import PlayerColor from './enum/PlayerColor'
import UnitType from './enum/UnitType'
import ColonyType from './enum/ColonyType'

/**
 * AI protocol cards.
 */
const cards : Card[] = [
  {
    id: 1,
    actions: [
      {
        actions: [ Action.COLONIZE, Action.ADVANCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.COLONIZE, Action.RECRUIT ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.RESEARCH_MILITARY, Action.MOVEMENT_SINGLE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.ACTION_CARD ],
        actionCardSlot: 4
      }
    ],
    behavior: [ Behavior.AGGRESSIVE, Behavior.EXPANSIVE, Behavior.DEFENSIVE, Behavior.VICTORY ],
    triggerSlots: [ 1, 4 ],
    behaviorSlot: 1,
    livingStormDirection: LivingStormDirection.DOWN_RIGHT,
    livingStormOrientation: LivingStormOrientation.VERTICAL,
    playerPriority: [ PlayerColor.YELLOW, PlayerColor.RED, PlayerColor.BLUE, PlayerColor.GREEN ],
    unitPriority: [ UnitType.MECH, UnitType.INFANTRY, UnitType.LIGHTSHIP, UnitType.WARSHIP ],
    colonyPriority: [ ColonyType.PRODUCTIVE, ColonyType.SCIENTIFIC, ColonyType.IMPERIAL, ColonyType.MILITARY ]
  },
  {
    id: 2,
    actions: [
      {
        actions: [ Action.COLONIZE, Action.RECRUIT ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.COLONIZE, Action.ADVANCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.LOSE_INFLUENCE_ACTION_CARD ],
        actionCardSlot: 1
      },
      {
        actions: [ Action.RESEARCH_CIVIL, Action.GAIN_INFLUENCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      }
    ],
    behavior: [ Behavior.EXPANSIVE, Behavior.VICTORY, Behavior.AGGRESSIVE, Behavior.DEFENSIVE ],
    triggerSlots: [ 1, 3 ],
    behaviorSlot: 2,
    livingStormDirection: LivingStormDirection.DOWN_RIGHT,
    livingStormOrientation: LivingStormOrientation.HORIZONTAL,
    playerPriority: [ PlayerColor.YELLOW, PlayerColor.RED, PlayerColor.BLUE, PlayerColor.GREEN ],
    unitPriority: [ UnitType.INFANTRY, UnitType.LIGHTSHIP, UnitType.WARSHIP, UnitType.MECH ],
    colonyPriority: [ ColonyType.IMPERIAL, ColonyType.PRODUCTIVE, ColonyType.SCIENTIFIC, ColonyType.MILITARY ]
  },
  {
    id: 3,
    actions: [
      {
        actions: [ Action.RECRUIT, Action.MOVEMENT_SINGLE ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      },
      {
        actions: [ Action.COLONIZE, Action.ADVANCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.GAIN_INFLUENCE, Action.LIVING_STORM_MOVEMENT ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      },
      {
        actions: [ Action.ACTION_CARD ],
        actionCardSlot: 1
      }
    ],
    behavior: [ Behavior.VICTORY, Behavior.AGGRESSIVE, Behavior.DEFENSIVE, Behavior.EXPANSIVE ],
    triggerSlots: [ 2, 3 ],
    behaviorSlot: 3,
    livingStormDirection: LivingStormDirection.DOWN_LEFT,
    livingStormOrientation: LivingStormOrientation.VERTICAL,
    playerPriority: [ PlayerColor.RED, PlayerColor.YELLOW, PlayerColor.GREEN, PlayerColor.BLUE ],
    unitPriority: [ UnitType.LIGHTSHIP, UnitType.WARSHIP, UnitType.INFANTRY, UnitType.MECH ],
    colonyPriority: [ ColonyType.PRODUCTIVE, ColonyType.IMPERIAL, ColonyType.SCIENTIFIC, ColonyType.MILITARY ]
  },
  {
    id: 4,
    actions: [
      {
        actions: [ Action.COLONIZE, Action.ADVANCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.RECRUIT, Action.MOVEMENT_SINGLE ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      },
      {
        actions: [ Action.LOSE_INFLUENCE_ACTION_CARD ],
        actionCardSlot: 4
      },
      {
        actions: [ Action.GAIN_INFLUENCE, Action.LIVING_STORM_MOVEMENT ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      }
    ],
    behavior: [ Behavior.AGGRESSIVE, Behavior.VICTORY, Behavior.EXPANSIVE, Behavior.DEFENSIVE ],
    triggerSlots: [ 2, 4 ],
    behaviorSlot: 4,
    livingStormDirection: LivingStormDirection.DOWN_LEFT,
    livingStormOrientation: LivingStormOrientation.HORIZONTAL,
    playerPriority: [ PlayerColor.RED, PlayerColor.YELLOW, PlayerColor.GREEN, PlayerColor.BLUE ],
    unitPriority: [ UnitType.INFANTRY, UnitType.WARSHIP, UnitType.LIGHTSHIP, UnitType.MECH ],
    colonyPriority: [ ColonyType.PRODUCTIVE, ColonyType.IMPERIAL, ColonyType.SCIENTIFIC, ColonyType.MILITARY ]
  },
  {
    id: 5,
    actions: [
      {
        actions: [ Action.COLONIZE, Action.RECRUIT ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.COLONIZE, Action.ADVANCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.GAIN_INFLUENCE, Action.LIVING_STORM_MOVEMENT ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      },
      {
        actions: [ Action.ACTION_CARD ],
        actionCardSlot: 2
      }
    ],
    behavior: [ Behavior.AGGRESSIVE, Behavior.DEFENSIVE, Behavior.EXPANSIVE, Behavior.VICTORY ],
    triggerSlots: [ 1, 3 ],
    behaviorSlot: 1,
    livingStormDirection: LivingStormDirection.UP_LEFT,
    livingStormOrientation: LivingStormOrientation.VERTICAL,
    playerPriority: [ PlayerColor.BLUE, PlayerColor.GREEN, PlayerColor.YELLOW, PlayerColor.RED ],
    unitPriority: [ UnitType.WARSHIP, UnitType.MECH, UnitType.INFANTRY, UnitType.LIGHTSHIP ],
    colonyPriority: [ ColonyType.PRODUCTIVE, ColonyType.SCIENTIFIC, ColonyType.IMPERIAL, ColonyType.MILITARY ]
  },
  {
    id: 6,
    actions: [
      {
        actions: [ Action.COLONIZE, Action.ADVANCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.RECRUIT, Action.MOVEMENT_SINGLE ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      },
      {
        actions: [ Action.LOSE_INFLUENCE_ACTION_CARD ],
        actionCardSlot: 2
      },
      {
        actions: [ Action.RESEARCH_CIVIL, Action.GAIN_INFLUENCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      }
    ],
    behavior: [ Behavior.VICTORY, Behavior.EXPANSIVE, Behavior.AGGRESSIVE, Behavior.DEFENSIVE ],
    triggerSlots: [ 1, 2 ],
    behaviorSlot: 2,
    livingStormDirection: LivingStormDirection.UP_LEFT,
    livingStormOrientation: LivingStormOrientation.HORIZONTAL,
    playerPriority: [ PlayerColor.BLUE, PlayerColor.GREEN, PlayerColor.YELLOW, PlayerColor.RED ],
    unitPriority: [ UnitType.INFANTRY, UnitType.LIGHTSHIP, UnitType.MECH, UnitType.WARSHIP ],
    colonyPriority: [ ColonyType.SCIENTIFIC, ColonyType.PRODUCTIVE, ColonyType.MILITARY, ColonyType.IMPERIAL ]
  },
  {
    id: 7,
    actions: [
      {
        actions: [ Action.RECRUIT, Action.MOVEMENT_SINGLE ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      },
      {
        actions: [ Action.COLONIZE, Action.RECRUIT ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.RESEARCH_MILITARY, Action.MOVEMENT_SINGLE ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      },
      {
        actions: [ Action.ACTION_CARD ],
        actionCardSlot: 3
      }
    ],
    behavior: [ Behavior.EXPANSIVE, Behavior.DEFENSIVE, Behavior.VICTORY, Behavior.AGGRESSIVE ],
    triggerSlots: [ 2, 4 ],
    behaviorSlot: 4,
    livingStormDirection: LivingStormDirection.UP_RIGHT,
    livingStormOrientation: LivingStormOrientation.HORIZONTAL,
    playerPriority: [ PlayerColor.GREEN, PlayerColor.BLUE, PlayerColor.RED, PlayerColor.YELLOW ],
    unitPriority: [ UnitType.LIGHTSHIP, UnitType.MECH, UnitType.WARSHIP, UnitType.INFANTRY ],
    colonyPriority: [ ColonyType.MILITARY, ColonyType.PRODUCTIVE, ColonyType.SCIENTIFIC, ColonyType.IMPERIAL ]
  },
  {
    id: 8,
    actions: [
      {
        actions: [ Action.COLONIZE, Action.ADVANCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.RECRUIT, Action.MOVEMENT_SINGLE ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      },
      {
        actions: [ Action.GAIN_INFLUENCE, Action.LIVING_STORM_MOVEMENT ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      },
      {
        actions: [ Action.RESEARCH_MILITARY, Action.MOVEMENT_SINGLE ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      }
    ],
    behavior: [ Behavior.VICTORY, Behavior.AGGRESSIVE, Behavior.EXPANSIVE, Behavior.DEFENSIVE ],
    triggerSlots: [ 2, 3 ],
    behaviorSlot: 4,
    livingStormDirection: LivingStormDirection.UP_RIGHT,
    livingStormOrientation: LivingStormOrientation.VERTICAL,
    playerPriority: [ PlayerColor.GREEN, PlayerColor.BLUE, PlayerColor.RED, PlayerColor.YELLOW ],
    unitPriority: [ UnitType.LIGHTSHIP, UnitType.INFANTRY, UnitType.WARSHIP, UnitType.MECH ],
    colonyPriority: [ ColonyType.PRODUCTIVE, ColonyType.MILITARY, ColonyType.SCIENTIFIC, ColonyType.IMPERIAL ]
  },
  {
    id: 9,
    actions: [
      {
        actions: [ Action.RECRUIT, Action.MOVEMENT_SINGLE ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      },
      {
        actions: [ Action.COLONIZE, Action.ADVANCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.RESEARCH_CIVIL, Action.GAIN_INFLUENCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.GAIN_INFLUENCE, Action.LIVING_STORM_MOVEMENT ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND
      }
    ],
    behavior: [ Behavior.AGGRESSIVE, Behavior.EXPANSIVE, Behavior.VICTORY, Behavior.DEFENSIVE ],
    triggerSlots: [ 1, 3 ],
    behaviorSlot: 1,
    livingStormDirection: LivingStormDirection.UTOPIAN_SECTOR,
    livingStormOrientation: LivingStormOrientation.HORIZONTAL,
    playerPriorityWatcherToken: true,
    unitPriority: [ UnitType.WARSHIP, UnitType.LIGHTSHIP, UnitType.INFANTRY, UnitType.MECH ],
    colonyPriority: [ ColonyType.IMPERIAL, ColonyType.MILITARY, ColonyType.PRODUCTIVE, ColonyType.SCIENTIFIC ]
  },
  {
    id: 10,
    actions: [
      {
        actions: [ Action.COLONIZE, Action.RECRUIT ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.COLONIZE, Action.ADVANCE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.RESEARCH_MILITARY, Action.MOVEMENT_SINGLE ],
        conditionalActivation: ConditionalActivation.FIRST_OR_SECOND
      },
      {
        actions: [ Action.GAIN_INFLUENCE, Action.ACTION_CARD ],
        conditionalActivation: ConditionalActivation.FIRST_IF_AVAILABLE_THEN_SECOND,
        actionCardSlot: 3
      }
    ],
    behavior: [ Behavior.EXPANSIVE, Behavior.VICTORY, Behavior.DEFENSIVE, Behavior.AGGRESSIVE ],
    triggerSlots: [ 1, 3 ],
    behaviorSlot: 1,
    livingStormDirection: LivingStormDirection.UTOPIAN_SECTOR,
    livingStormOrientation: LivingStormOrientation.VERTICAL,
    playerPriorityWatcherToken: true,
    unitPriority: [ UnitType.WARSHIP, UnitType.LIGHTSHIP, UnitType.INFANTRY, UnitType.MECH ],
    colonyPriority: [ ColonyType.IMPERIAL, ColonyType.MILITARY, ColonyType.PRODUCTIVE, ColonyType.SCIENTIFIC ]
  }
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardType Card type
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  }

}
