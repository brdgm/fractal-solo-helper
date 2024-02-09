<template>
  <ActionTitle :action="action" :botActionItem="botActionItem"/>
  <SelectTechnology @technology="selectTechnology"/>
  <FactionActionAbilities :action="action" :botActions="botActions"/>
  <ActionRulesCollapse>
    <ul>
      <li v-html="t('rules.action.research.scienceTrack')"></li>
      <li v-html="t('rules.action.research.chooseTech', {type:t('rules.action.research-military.type')})"></li>
      <li v-html="t('rules.action.research.chooseTechFallback')"></li>
      <li v-html="t('rules.action.research.shortCircuit')"></li>
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
import Technology from '@/services/enum/Technology'
import SelectTechnology from '../SelectTechnology.vue'
import FactionActionAbilities from '../FactionActionAbilities.vue'

export default defineComponent({
  name: 'ActionResearchMilitary',
  components: {
    ActionRulesCollapse,
    ActionTitle,
    SelectTechnology,
    FactionActionAbilities
  },
  emits: {
    technology: (_technology?: Technology) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
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
  methods: {
    selectTechnology(technology?: Technology) {
      this.$emit('technology', technology)
    }
  }
})
</script>
