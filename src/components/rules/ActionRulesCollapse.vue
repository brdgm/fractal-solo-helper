<template>
  <div>
    <button class="btn btn-sm btn-secondary mb-3 me-1" data-bs-toggle="collapse" :data-bs-target="`#rules-${id}`" @click="showRules = !showRules">
      {{t(`actionRulesCollapse.${showRules ? 'hideRules' : 'showRules'}`)}}
    </button>
    <BehaviorButton v-if="behavior" :behavior="behavior" class="mb-3 me-1"/>
    <div class="collapse" :id="`rules-${id}`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { uniqueId } from 'lodash'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BehaviorButton from './BehaviorButton.vue'
import { PropType } from 'vue'
import Behavior from '@/services/enum/Behavior'

export default defineComponent({
  name: 'ActionRulesCollapse',
  components: {
    BehaviorButton
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    behavior: {
      type: String as PropType<Behavior>,
      required: false
    }
  },
  computed: {
    id() : string {
      return uniqueId()
    }
  },
  data() {
    return {
      showRules: false
    }
  }
})
</script>
