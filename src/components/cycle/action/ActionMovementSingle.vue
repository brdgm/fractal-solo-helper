<template>
  <ActionTitle :action="action" :botActionItem="botActionItem"/>
  <FactionActionPhaseAbilities :action="action" :botActions="botActions"/>
  <ActionRulesCollapse :bot="botActions.bot" :behavior="behavior">
    <ul>
      <li v-html="t('rules.action.movement-single.singleOrder')"></li>
      <li v-html="t('rules.action.movement-single.scienceTrack')"></li>
      <li v-html="t('rules.action.movement-single.behavior', {behavior:t(`rules.concepts.behavior.${behavior}.title`)})"></li>
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
import FactionActionPhaseAbilities from '../FactionActionPhaseAbilities.vue'

export default defineComponent({
  name: 'ActionMovementSingle',
  components: {
    ActionRulesCollapse,
    ActionTitle,
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
  },
  computed: {
    behavior() : Behavior {
      return this.botActions.behavior
    }
  }
})
</script>
