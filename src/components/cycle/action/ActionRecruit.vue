<template>
  <ActionTitle :action="action" :botActionItem="botActionItem"/>
  <p>
    <i>{{t(`rules.concepts.behavior.${behavior}.title`)}}</i>:
    <span v-html="t(`rules.concepts.behavior.${behavior}.recruitSummary`)"></span>
  </p>
  <ActionRulesCollapse>
    <ul>
      <li>
        <span v-html="t('rules.action.recruit.addUnits', {behavior:t(`rules.concepts.behavior.${behavior}.title`)})"></span>
        <ul>
          <li v-html="t(`rules.concepts.behavior.${behavior}.recruitDescription`)"></li>
        </ul>
      </li>
      <li v-html="t('rules.action.recruit.unitSelection')"></li>
      <li v-html="t('rules.action.recruit.notPossible')"></li>
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
import Behavior from '@/services/enum/Behavior'

export default defineComponent({
  name: 'ActionColonize',
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
  },
  computed: {
    behavior() : Behavior {
      return this.botActions.behavior
    }
  }
})
</script>
