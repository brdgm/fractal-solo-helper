<template>
  <SideBar :navigationState="navigationState" @technology="selectTechnology"/>
  <ContentLeftOfSidebar>
    <h1>{{t('cycleEnd.title')}}</h1>

    <ol>
      <li v-html="t('cycleEnd.prestigeCheck')"></li>
      <li v-html="t('cycleEnd.utopianSectorReward')"></li>
      <li v-if="!isLastCycle" v-html="t('cycleEnd.cleanup')"></li>
      <li v-html="t('cycleEnd.depletionUpkeep')"></li>
      <li v-if="!isLastCycle">
        <span v-html="t('cycleEnd.determineFirstPlayer')"></span>
        <ul v-if="watcherPlayer.bot">
          <li v-html="t('cycleEnd.firstPlayerBot', {faction:t(`faction.${getBotFaction(watcherPlayer.bot)}.title`)})"></li>
        </ul>
      </li>
      <li v-if="!isLastCycle" v-html="t('cycleEnd.advanceCycleMarker')"></li>
    </ol>

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
import { CycleEnd, useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/cycle/SideBar.vue'
import DebugInfo from '@/components/cycle/DebugInfo.vue'
import { PlayerOrder } from '@/util/getPlayerOrder'
import getWatcherPlayer from '@/util/getWatcherPlayer'
import Faction from '@/services/enum/Faction'
import getBotFaction from '@/util/getBotFaction'
import ContentLeftOfSidebar from '@/components/cycle/ContentLeftOfSidebar.vue'
import Technology from '@/services/enum/Technology'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'CycleEnd',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    ContentLeftOfSidebar
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const playerSetup = state.setup.playerSetup
    const navigationState = new NavigationState(route, state)
    const { cycle } = navigationState
    return { t, state, playerSetup, cycle, navigationState }
  },
  data() {
    return {
      selectedTechnology: [] as (Technology|undefined)[],
      technologyAction: [] as (Action|undefined)[]
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/cycle/${this.cycle}/conflict`
    },
    watcherPlayer() : PlayerOrder {
      return getWatcherPlayer(this.state, this.cycle)
    },
    isLastCycle() : boolean {
      return this.cycle == this.navigationState.cycleCount
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
      const cycleEnd : CycleEnd = {
        cycle: this.cycle,
        botsActions: this.navigationState.botsActions.map(botActions => botActions.toPersistence())
      }
      this.state.storeCycleEnd(cycleEnd)
      if (this.cycle % 2 == 0) {
        this.$router.push(`/cycle/${this.cycle}/transition`)
      }
      else {
        this.$router.push(`/cycle/${this.cycle+1}/income`)
      }
    },
    getBotFaction(bot: number) : Faction {
      return getBotFaction(this.playerSetup, bot)
    },
    selectTechnology(bot:number, technology?: Technology, action?: Action) {
      this.selectedTechnology[bot-1] = technology
      this.technologyAction[bot-1] = action
    }
  }
})
</script>
