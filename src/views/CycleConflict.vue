<template>
  <SideBar :navigationState="navigationState" @technology="selectTechnology"/>
  <ContentLeftOfSidebar>
    <h1>{{t('cycleConflict.title')}}</h1>

    <ConflictInstructions :navigationState="navigationState"/>

    <template v-for="botActions of navigationState.botsActions" :key="botActions.bot">
      <FactionActionPhaseAbilities :botActions="botActions" :phase="phase" :showFactionName="true"/>
    </template>

    <button class="btn btn-primary btn-lg mt-4" @click="next()">
      {{t('action.next')}}
    </button>
  </ContentLeftOfSidebar>

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
import ContentLeftOfSidebar from '@/components/cycle/ContentLeftOfSidebar.vue'
import Technology from '@/services/enum/Technology'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'CycleConflict',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    ConflictInstructions,
    FactionActionPhaseAbilities,
    ContentLeftOfSidebar
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
      selectedTechnology: [] as (Technology|undefined)[],
      technologyAction: [] as (Action|undefined)[]
    }
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
      // check for selected technologies from colonization bonus
      for (const botActions of this.navigationState.botsActions) {
        const selectedTechnology = this.selectedTechnology[botActions.bot-1]
        const technologyAction = this.technologyAction[botActions.bot-1]
        if (selectedTechnology && technologyAction) {
          botActions.technologies.add(technologyAction, selectedTechnology)
        }
      }
      // store conflict phase
      const conflictPhase : ConflictPhase = {
        cycle: this.cycle,
        botsActions: this.navigationState.botsActions.map(botActions => botActions.toPersistence())
      }
      this.state.storeCycleConflictPhase(conflictPhase)
      this.$router.push(`/cycle/${this.cycle}/end`)
    },
    selectTechnology(bot:number, technology?: Technology, action?: Action) {
      this.selectedTechnology[bot-1] = technology
      this.technologyAction[bot-1] = action
    }
  }
})
</script>
