<template>
  <div class="action-title">
    <AppIcon type="action" :name="action" class="icon"/>
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
import AppIcon from '@/components/structure/AppIcon.vue'
import Action from '@/services/enum/Action'
import ActionRulesCollapse from '../ActionRulesCollapse.vue'

export default defineComponent({
  name: 'ActionColonize',
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
