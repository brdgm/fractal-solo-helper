<template>
  <button class="btn me-2"
      :class="{'btn-success':!answers.isNo(index),'btn-secondary':answers.isNo(index)}"
      @click="answers.yes(index)">{{t('action.yes')}}</button>
  <button class="btn me-2"
      :class="{'btn-danger':!answers.isYes(index),'btn-secondary':answers.isYes(index)}"
      @click="answers.no(index)">{{t('action.no')}}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BehaviorAnswers from '@/services/BehaviorAnswers'

export default defineComponent({
  name: 'BehaviorYesNoButtons',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    answers: {
      type: BehaviorAnswers,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
})
</script>
