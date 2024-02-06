<template>
  <div class="action-title">
    <AppIcon type="action" :name="action" class="icon"/>
    <h5 class="title">{{t(`rules.action.${action}.title`)}}</h5>
  </div>
  <ActionRulesCollapse>
    <ul>
      <li>The Automata performs a single movement order.</li>
      <li>Move the Automata units on the board according to the active AI behavior.</li>
      <li>The imperial track determines how many movement orders the Automata can give, i.e., how many space units can move during the action.</li>
      <li>The science track determines the number of sectors they can move.</li>
      <li>For each space unit you move, check the AI behavior to determine how they must move. This process must be repeated every time a unit moves, not just once.</li>
    </ul>
  </ActionRulesCollapse>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions, { BotActionItem } from '@/services/BotActions'
import AppIcon from '@/components/structure/AppIcon.vue'
import Action from '@/services/enum/Action'
import ActionRulesCollapse from '../ActionRulesCollapse.vue'

export default defineComponent({
  name: 'ActionMovementSingle',
  components: {
    AppIcon,
    ActionRulesCollapse
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
