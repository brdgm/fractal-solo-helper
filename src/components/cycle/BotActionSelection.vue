<template>
  <h4>Action 1</h4>
  <div class="mt-3">
    <component :is="`action-${botActions.actions[0].items[0].action}`"
        :action="botActions.actions[0].items[0].action"
        :botAction="botActions.actions[0]"
        :botActions="botActions"/>
  </div>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="executed()">
    {{t('turnBot.executed')}}
  </button>
  <button class="btn btn-danger btn-lg mt-4" @click="notPossible()">
    {{t('turnBot.notPossible')}}
  </button>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionAdvance from './action/ActionAdvance.vue'
import ActionColonize from './action/ActionColonize.vue'
import ActionRecruit from './action/ActionRecruit.vue'
import BotActions from '@/services/BotActions'

export default defineComponent({
  name: 'BotActionSelection',
  components: {
    ActionAdvance,
    ActionColonize,
    ActionRecruit
  },
  emits: ['next','back'],
  setup() {
    const { t } = useI18n()    
    return { t }
  },
  props: {
    botActions: {
      type: BotActions,
      required: true
    }
  },
  methods: {
    executed() {
      this.$emit('next')
    },
    notPossible() {
      // TODO: implement
    },
    back() {
      this.$emit('back')
    }
  }
})
</script>

<style lang="scss">
.action-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  .icon {
    width: 3rem;
  }
  .title {
    margin-left: 0.5rem;
  }
}
</style>
