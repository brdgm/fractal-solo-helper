<template>
  <h4>Action {{actionIndex}}</h4>
  <div class="mt-3" v-if="botActionItem">
    <div v-for="action of botActionItem.actions" :key="action">
      <component v-if="isTechnologyAction(action)" :is="`action-${action}`"
          :action="action"
          :botActionItem="botActionItem"
          :botActions="botActions"
          @technology="(technology:Technology) => selectTechnology(technology, action)"/>
      <component v-else :is="`action-${action}`"
          :action="action"
          :botActionItem="botActionItem"
          :botActions="botActions"/>
    </div>
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
import ActionLooseInfluenceActionCard from './action/ActionLooseInfluenceActionCard.vue'
import ActionMovementSingle from './action/ActionMovementSingle.vue'
import ActionRecruit from './action/ActionRecruit.vue'
import ActionResearchCivil from './action/ActionResearchCivil.vue'
import ActionResearchMilitary from './action/ActionResearchMilitary.vue'
import Action from '@/services/enum/Action'
import Technology from '@/services/enum/Technology'

export default defineComponent({
  name: 'BotActionSelection',
  components: {
    ActionActionCard,
    ActionAdvance,
    ActionColonize,
    ActionGainInfluence,
    ActionLivingStormMovement,
    ActionLooseInfluenceActionCard,
    ActionMovementSingle,
    ActionRecruit,
    ActionResearchCivil,
    ActionResearchMilitary
  },
  emits: {
    technology: (_technology?: Technology, _technologyAction?: Action) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars,
    next: () => true  // eslint-disable-line @typescript-eslint/no-unused-vars,
  },
  setup() {
    const { t } = useI18n()    
    return { t }
  },
  props: {
    botActions: {
      type: BotActions,
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
    hasTechnologyAction() : boolean {
      const actions = this.botActionItem?.actions ?? []
      return actions.find(action => this.isTechnologyAction(action)) != undefined
    },
    nextValid() : boolean {
      if (this.hasTechnologyAction) {
        return this.selectedTechnology != undefined
      }
      return true
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
    isTechnologyAction(action: Action) {
      return action === Action.RESEARCH_CIVIL || action === Action.RESEARCH_MILITARY
    },
    selectTechnology(technology?: Technology, action?: Action) {
      this.selectedTechnology = technology
      this.technologyAction = technology != undefined ? action : undefined
      this.$emit('technology', this.selectedTechnology, this.technologyAction)
    }
  }
})
</script>
