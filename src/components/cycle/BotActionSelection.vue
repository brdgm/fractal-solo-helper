<template>
  <h4>{{t('turnBot.action', {action:actionIndex})}}</h4>
  <div class="mt-3" v-if="botActionItem">
    <div v-for="action of botActionItem.actions" :key="action">
      <component v-if="isTechnologyMandatoryAction(action) || isTechnologyOptionalAction(action)" :is="`action-${action}`"
          :action="action"
          :botActionItem="botActionItem"
          :botActions="botActions"
          @technology="selectTechnology"/>
      <component v-else :is="`action-${action}`"
          :action="action"
          :botActionItem="botActionItem"
          :botActions="botActions"/>
    </div>
  </div>

  <div class="row" v-if="isTakeWatcherToken">
    <div class="col alert alert-warning"
      v-html="resolveIconReferences(t('turnBot.takeWatcherToken', {faction:t(`faction.${botFaction}.title`)}))"></div>
  </div>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="executed()" :disabled="!nextValid">
    {{t('turnBot.executed')}}
  </button>
  <button class="btn btn-danger btn-lg mt-4" @click="notPossible()">
    {{t('turnBot.notPossible')}}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions, { BotAction, BotActionItem } from '@/services/BotActions'
import ActionActionCard from './action/ActionActionCard.vue'
import ActionAdvance from './action/ActionAdvance.vue'
import ActionColonize from './action/ActionColonize.vue'
import ActionGainInfluence from './action/ActionGainInfluence.vue'
import ActionLivingStormMovement from './action/ActionLivingStormMovement.vue'
import ActionLoseInfluenceActionCard from './action/ActionLoseInfluenceActionCard.vue'
import ActionMovementSingle from './action/ActionMovementSingle.vue'
import ActionRecruit from './action/ActionRecruit.vue'
import ActionResearchCivil from './action/ActionResearchCivil.vue'
import ActionResearchMilitary from './action/ActionResearchMilitary.vue'
import Action from '@/services/enum/Action'
import Technology from '@/services/enum/Technology'
import getWatcherPlayer from '@/util/getWatcherPlayer'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import Faction from '@/services/enum/Faction'
import getBotFaction from '@/util/getBotFaction'
import resolveIconReferences from '@/util/resolveIconReferences'

export default defineComponent({
  name: 'BotActionSelection',
  components: {
    ActionActionCard,
    ActionAdvance,
    ActionColonize,
    ActionGainInfluence,
    ActionLivingStormMovement,
    ActionLoseInfluenceActionCard,
    ActionMovementSingle,
    ActionRecruit,
    ActionResearchCivil,
    ActionResearchMilitary
  },
  emits: {
    technology: (_technology?: Technology, _technologyAction?: Action) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars,
    next: () => true
  },
  setup() {
    const { t } = useI18n()    
    const state = useStateStore()
    return { t, state }
  },
  props: {
    botActions: {
      type: BotActions,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    },
    actionIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      actionItem: 0,
      selectedTechnology: undefined as Technology|undefined,
      technologyAction: undefined as Action|undefined
    }
  },
  computed: {
    botAction() : BotAction|undefined {
      return this.botActions.actions[this.actionIndex-1]
    },
    botActionItem() : BotActionItem|undefined {
      return this.botAction?.items[this.actionItem]
    },
    hasTechnologyMandatoryAction() : boolean {
      const actions = this.botActionItem?.actions ?? []
      return actions.find(action => this.isTechnologyMandatoryAction(action)) != undefined
    },
    nextValid() : boolean {
      if (this.hasTechnologyMandatoryAction) {
        return this.selectedTechnology != undefined
      }
      return true
    },
    botFaction() : Faction {
      return getBotFaction(this.state.setup.playerSetup, this.botActions.bot)
    },
    isTakeWatcherToken() : boolean {
      const watcherPlayer = getWatcherPlayer(this.state, this.navigationState.cycle, this.navigationState.stateIndex)
      return (this.navigationState.action == 2) && this.botActions.cardDeck.isPass()
          && !watcherPlayer.bot && !watcherPlayer.player
    }
  },
  methods: {
    executed() {
      this.$emit('next')
    },
    notPossible() {
      if (this.botAction && this.actionItem < this.botAction.items.length-1) {
        this.actionItem++
      } else {
        this.$emit('next')
      }
    },
    isTechnologyMandatoryAction(action: Action) {
      return action == Action.RESEARCH_CIVIL || action == Action.RESEARCH_MILITARY
    },
    isTechnologyOptionalAction(action: Action) {
      return action == Action.ACTION_CARD || action == Action.LOSE_INFLUENCE_ACTION_CARD
    },
    selectTechnology(technology?: Technology, action?: Action) {
      this.selectedTechnology = technology
      this.technologyAction = technology != undefined ? action : undefined
      this.$emit('technology', this.selectedTechnology, this.technologyAction)
    },
    resolveIconReferences(text: string) : string {
      return resolveIconReferences(text)
    }
  }
})
</script>
