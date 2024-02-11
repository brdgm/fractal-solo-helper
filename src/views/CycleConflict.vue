<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('cycleConflict.title')}}</h1>

  <ConflictInstructions :navigationState="navigationState"/>

  <template v-for="botActions of navigationState.botsActions" :key="botActions.bot">
    <FactionActionPhaseAbilities :botActions="botActions" :phase="phase" :showFactionName="true"/>
  </template>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>
  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { ConflictPhase, useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import RouteCalculator from '@/services/RouteCalculator'
import SideBar from '@/components/cycle/SideBar.vue'
import DebugInfo from '@/components/cycle/DebugInfo.vue'
import ConflictInstructions from '@/components/cycle/ConflictInstructions.vue'
import Phase from '@/services/enum/Phase'
import FactionActionPhaseAbilities from '@/components/cycle/FactionActionPhaseAbilities.vue'

export default defineComponent({
  name: 'CycleConflict',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    ConflictInstructions,
    FactionActionPhaseAbilities
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
    },
    phase() : Phase {
      return Phase.CONFLICT
    }
  },
  methods: {
    next() : void {
      // store conflict phase
      const conflictPhase : ConflictPhase = {
        cycle: this.cycle,
        botsActions: this.navigationState.botsActions.map(botActions => botActions.toPersistence())
      }
      this.state.storeCycleConflictPhase(conflictPhase)
      this.$router.push(`/cycle/${this.cycle}/end`)
    }
  }
})
</script>
