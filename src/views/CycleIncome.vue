<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('cycleIncome.title')}}</h1>

  <ol>
    <li>
      <span v-html="t('cycleIncome.startPlayer')"></span><br/>
      <DetermineStartPlayer @startPlayer="setStartPlayer" class="mt-2"/>
    </li>
    <li v-html="t('cycleIncome.gainIncome')"></li>
  </ol>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" v-if="startPlayer">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>
  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Cycle, useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import DetermineStartPlayer from '@/components/cycle/DetermineStartPlayer.vue'
import RouteCalculator from '@/services/RouteCalculator'
import SideBar from '@/components/cycle/SideBar.vue'
import DebugInfo from '@/components/cycle/DebugInfo.vue'

export default defineComponent({
  name: 'CycleIncome',
  components: {
    FooterButtons,
    DetermineStartPlayer,
    SideBar,
    DebugInfo
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
  data() {
    return {
      startPlayer: undefined as number|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.cycle > 1) {
        return `/cycle/${this.cycle-1}/end`
      }
      return ''
    }
  },
  methods: {
    next() : void {
      // store cycle
      if (this.startPlayer) {
        const cycle : Cycle = {
          cycle: this.cycle,
          startPlayer: this.startPlayer,
          turns: []
        }
        this.state.storeCycle(cycle)
      }
      this.$router.push(this.routeCalculator.getFirstTurnRouteTo(this.state))
    },
    setStartPlayer(startPlayer: number) : void {
      this.startPlayer = startPlayer
    }
  }
})
</script>
