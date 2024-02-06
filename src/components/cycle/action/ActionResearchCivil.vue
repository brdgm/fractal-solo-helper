<template>
  <ActionTitle :action="action" :botActionItem="botActionItem"/>
  <ActionRulesCollapse>
    <ul>
      <li>Check the science track on the empire board for the card with the highest scientific cost that can be developed.</li>
      <li>On the <b>civil</b> technology board, take a card that matches this cost.</li>
      <li>If there is no card with that cost, take a card with the next lower cost.</li>
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
  name: 'ActionResearchCivil',
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
