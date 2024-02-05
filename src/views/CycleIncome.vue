<template>
  <h1>{{t('cycleIncome.title', {cycle})}}</h1>

  <ol>
    <li>TBD {{cycle}}</li>
  </ol>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'CycleIncome',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { cycle } = navigationState
    return { t, state, cycle }
  },
  computed: {
    backButtonRouteTo() : string {
      return ''
    }
  },
  methods: {
    next() : void {
      this.$router.push(`/cycle/${this.cycle}/turn/1`)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
