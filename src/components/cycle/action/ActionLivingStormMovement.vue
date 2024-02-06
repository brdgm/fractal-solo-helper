<template>
  <ActionTitle :action="action" :botActionItem="botActionItem"/>
  <ActionRulesCollapse>
    <ul>
      <li v-html="t('rules.action.living-storm-movement.moveStorm')"></li>
      <li v-html="t('rules.action.living-storm-movement.identifyMovements')"></li>
    </ul>
  </ActionRulesCollapse>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions, { BotActionItem } from '@/services/BotActions'
import Action from '@/services/enum/Action'
import ActionRulesCollapse from '../ActionRulesCollapse.vue'
import ActionTitle from '../ActionTitle.vue'

export default defineComponent({
  name: 'ActionLivingStormMovement',
  components: {
    ActionRulesCollapse,
    ActionTitle
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
  }
})
</script>
