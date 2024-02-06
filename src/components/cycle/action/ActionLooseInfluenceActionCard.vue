<template>
  <div class="action-title">
    <AppIcon type="action" name="loose-influence" class="icon"/>
    <ActionCardIcon class="icon" :actionCardSlot="botAction.actionCardSlot"/>
    <h5 class="title">{{t(`rules.action.${action}.title`)}}</h5>
  </div>
  <ActionRulesCollapse>
    <ul>
      <li>Move the influence marker one step to the left on the empire board.</li>
      <li>Play the action card from slot {{botAction.actionCardSlot}} of the Action display. The action on the card is ignored.</li>
      <li>Check the pendulum action section on the faction mat and trigger the applicable action.</li>
    </ul>
  </ActionRulesCollapse>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions, { BotAction } from '@/services/BotActions'
import AppIcon from '@/components/structure/AppIcon.vue'
import Action from '@/services/enum/Action'
import ActionRulesCollapse from '../ActionRulesCollapse.vue'
import ActionCardIcon from '@/components/structure/ActionCardIcon.vue'

export default defineComponent({
  name: 'ActionLooseInfluenceActionCard',
  components: {
    AppIcon,
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
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    },
    botActions: {
      type: BotActions,
      required: true
    }
  }
})
</script>
