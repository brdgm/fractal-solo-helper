<template>
  <ActionTitle :action="action" :botActionItem="botActionItem">
    <ActionCardIcon class="icon" :actionCardSlot="botActionItem.actionCardSlot"/>
  </ActionTitle>
  <PendulumAction :botActions="botActions"/>
  <FactionActionPhaseAbilities :action="action" :botActions="botActions"/>
  <ActionRulesCollapse>
    <ul>
      <li v-html="t('rules.action.action-card.playCard', {slot:botActionItem.actionCardSlot})"></li>
      <li v-html="t('rules.action.action-card.drawCard')"></li>
      <li v-html="t('rules.action.action-card.checkPendulum')"></li>
    </ul>
  </ActionRulesCollapse>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions, { BotActionItem } from '@/services/BotActions'
import Action from '@/services/enum/Action'
import ActionRulesCollapse from '@/components/rules/ActionRulesCollapse.vue'
import ActionCardIcon from '@/components/structure/ActionCardIcon.vue'
import ActionTitle from '../ActionTitle.vue'
import PendulumAction from '../PendulumAction.vue'
import FactionActionPhaseAbilities from '../FactionActionPhaseAbilities.vue'

export default defineComponent({
  name: 'ActionActionCard',
  components: {
    ActionRulesCollapse,
    ActionCardIcon,
    ActionTitle,
    PendulumAction,
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
  }
})
</script>
