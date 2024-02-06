<template>
  <div class="action-title">
    <ActionCardIcon class="icon" :actionCardSlot="botActionItem.actionCardSlot"/>
    <h5 class="title">{{t(`rules.action.${action}.title`)}}</h5>
  </div>
  <ActionRulesCollapse>
    <ul>
      <li>Play the action card from slot {{botActionItem.actionCardSlot}} of the Action display. The action on the card is ignored.</li>
      <li>Check the pendulum action section on the faction mat and trigger the applicable action.</li>
    </ul>
  </ActionRulesCollapse>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions, { BotActionItem } from '@/services/BotActions'
import Action from '@/services/enum/Action'
import ActionRulesCollapse from '../ActionRulesCollapse.vue'
import ActionCardIcon from '@/components/structure/ActionCardIcon.vue'

export default defineComponent({
  name: 'ActionActionCard',
  components: {
    ActionRulesCollapse,
    ActionCardIcon
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
