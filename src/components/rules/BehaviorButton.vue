<template>
  <button class="btn btn-secondary btn-sm" @click="openModal">
    {{t(`rules.concepts.behavior.${behavior}.title`)}}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Behavior from '@/services/enum/Behavior'
import { showModalPreselectTab } from 'brdgm-commons/src/util/modal/showModal'

export default defineComponent({
  name: 'BehaviorButton',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    behavior: {
      type: String as PropType<Behavior>,
      required: true
    }
  },
  methods: {
    openModal() {
      showModalPreselectTab('rulesBehaviorModal', `tablink-behavior-${this.behavior}`)
    }
  }
})
</script>
