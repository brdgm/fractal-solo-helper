<template>
  <div class="action-title">
    <ActionCardIcon class="icon" :actionCardSlot="botAction.actionCardSlot"/>
    <h5 class="title">{{t(`rules.action.${action}.title`)}}</h5>
  </div>
  <ActionRulesCollapse>
    <ul>
      <li>TBD</li>
    </ul>
  </ActionRulesCollapse>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions, { BotAction } from '@/services/BotActions'
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
