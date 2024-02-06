<template>
  <div class="action-title">
    <AppIcon type="action" :name="action" class="icon"/>
    <h5 class="title">{{t(`rules.action.${action}.title`)}}</h5>
  </div>
  <ActionRulesCollapse>
    <ul>
      <li>Add a colony to a colonizable sector controlled by the Automata and containing at least 1 infantry.</li>
      <li>Pick colony type based on current colony AI priority.</li>
      <li>If two possible sectors have priority for colony placement, use the <i>Short-circuit</i> rule.</li>
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
