<template>
  <ActionTitle :action="action" :botActionItem="botActionItem"/>
  <FactionActionPhaseAbilities :action="action" :botActions="botActions"/>
  <ActionRulesCollapse>
    <ul>
      <li v-html="t('rules.action.living-storm-movement.moveStorm')"></li>
      <li v-html="t(`rules.action.living-storm-movement.direction.${direction}`)"></li>
      <li v-html="t(`rules.action.living-storm-movement.orientation.${orientation}`)"></li>
    </ul>
  </ActionRulesCollapse>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions, { BotActionItem } from '@/services/BotActions'
import Action from '@/services/enum/Action'
import ActionRulesCollapse from '@/components/rules/ActionRulesCollapse.vue'
import ActionTitle from '../ActionTitle.vue'
import LivingStormOrientation from '@/services/enum/LivingStormOrientation'
import LivingStormDirection from '@/services/enum/LivingStormDirection'
import FactionActionPhaseAbilities from '../FactionActionPhaseAbilities.vue'

export default defineComponent({
  name: 'ActionLivingStormMovement',
  components: {
    ActionRulesCollapse,
    ActionTitle,
    FactionActionPhaseAbilities
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: String as PropType<Action>,
      required: true
    },
    botActionItem: {
      type: Object as PropType<BotActionItem>,
      required: true
    },
    botActions: {
      type: BotActions,
      required: true
    }
  },
  computed: {
    direction() : LivingStormDirection {
      return this.botActions.livingStormDirection
    },
    orientation() : LivingStormOrientation {
      return this.botActions.livingStormOrientation
    }
  }
})
</script>
