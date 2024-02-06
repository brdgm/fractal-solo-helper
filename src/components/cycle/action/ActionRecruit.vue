<template>
  <div class="action-title">
    <AppIcon type="action" :name="action" class="icon"/>
    <h5 class="title">{{t(`rules.action.${action}.title`)}}</h5>
  </div>
  <ActionRulesCollapse>
    <ul>
      <li>Add units to a sector colonized by the Automata, determined by the active AI behavior.</li>
      <li>The rightmost visible space on the military track determines the recruited units. If the Automata doesn’t have enough units in reserve to place the indicated units, check the composition of the space immediately to the left. Keep going until you find a valid set of units.</li>
      <li>If the Automata can’t recruit the required units in full because it doesn’t have enough in its reserve, then apply the Last breath rule. If the Automata still cannot perform the action, ignore it.</li>
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
