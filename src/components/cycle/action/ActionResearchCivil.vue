<template>
  <ActionTitle :action="action" :botActionItem="botActionItem"/>
  <SelectTechnology @technology="selectTechnology"/>
  <FactionActionPhaseAbilities :action="action" :botActions="botActions" :additionalTechnology="selectedTechnology"/>
  <ActionRulesCollapse>
    <ul>
      <li v-html="t('rules.action.research.scienceTrack')"></li>
      <li v-html="t('rules.action.research.chooseTech', {type:t('rules.action.research-civil.type')})"></li>
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
import SelectTechnology from '../SelectTechnology.vue'
import Technology from '@/services/enum/Technology'
import FactionActionPhaseAbilities from '../FactionActionPhaseAbilities.vue'

export default defineComponent({
  name: 'ActionResearchCivil',
  components: {
    ActionRulesCollapse,
    ActionTitle,
    SelectTechnology,
    FactionActionPhaseAbilities
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
  data() {
    return {
      selectedTechnology: undefined as Technology|undefined
    }
  },
  methods: {
    selectTechnology(technology?: Technology) {
      this.selectedTechnology = technology
      this.$emit('technology', technology)
    }
  }
})
</script>
