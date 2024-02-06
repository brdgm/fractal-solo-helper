<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('cycleConflict.title', {cycle})}}</h1>

  <p>TBD</p>

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
import RouteCalculator from '@/services/RouteCalculator'
import SideBar from '@/components/cycle/SideBar.vue'

export default defineComponent({
  name: 'CycleConflict',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { cycle } = navigationState
    const routeCalculator = new RouteCalculator({cycle})
    return { t, state, cycle, routeCalculator, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      this.$router.push(`/cycle/${this.cycle}/end`)
    }
  }
})
</script>
