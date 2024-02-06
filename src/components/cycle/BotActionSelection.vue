<template>
  <h4>Action {{actionIndex}}</h4>
  <div class="mt-3" v-if="botAction">
    <component :is="`action-${botAction.items[actionItem].action}`"
        :action="botAction.items[actionItem].action"
        :botAction="botAction"
        :botActions="botActions"/>
  </div>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="executed()">
    {{t('turnBot.executed')}}
  </button>
  <button class="btn btn-danger btn-lg mt-4" @click="notPossible()">
    {{t('turnBot.notPossible')}}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions, { BotAction } from '@/services/BotActions'
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
  emits: ['next'],
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
      actionItem: 0
    }
  },
  computed: {
    botAction() : BotAction|undefined {
      return this.botActions.actions[this.actionIndex-1]
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
    }
  }
})
</script>

<style lang="scss">
.action-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  .icon {
    width: 3rem;
    min-width: 3rem;
    margin-right: 0.25rem;
  }
  .title {
    margin-left: 0.25rem;
  }
}
</style>
