<template>
  <div class="action-title">
    <slot>
      <AppIcon type="action" :name="action"/>
    </slot>
    <div class="title">
      <h5>{{t(`rules.action.${action}.title`)}}</h5>
      <div v-if="botActionItem.fallback" class="fallback">{{t('rules.concepts.important.lastBreath.title')}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { BotActionItem } from '@/services/BotActions'
import Action from '@/services/enum/Action'
import { PropType, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionTitle',
  components: {
    AppIcon
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
    }
  }
})
</script>

<style lang="scss">
.action-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  img, svg {
    width: 3rem;
    min-width: 3rem;
    margin-right: 0.25rem;
  }
  .title {
    margin-left: 0.25rem;
    .fallback {
      font-size: 75%;
      margin-top: -0.5rem;
      font-style: italic;
    }
  }
}
</style>
