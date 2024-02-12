<template>
  <SideBar :navigationState="navigationState"/>
  <ContentLeftOfSidebar>
    <h1>{{t('cycleEnd.title')}}</h1>

    <ol>
      <li v-html="t('cycleEnd.prestigeCheck')"></li>
      <li v-html="t('cycleEnd.utopianSectorReward')"></li>
      <li v-html="t('cycleEnd.cleanup')"></li>
      <li v-html="t('cycleEnd.depletionUpkeep')"></li>
      <li>
        <span v-html="t('cycleEnd.determineFirstPlayer')"></span>
        <ul v-if="watcherPlayer.bot">
          <li v-html="t('cycleEnd.firstPlayerBot', {faction:t(`faction.${getBotFaction(watcherPlayer.bot)}.title`)})"></li>
        </ul>
      </li>
      <li v-html="t('cycleEnd.advanceCycleMarker')"></li>
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
import { useStateStore } from '@/store/state'
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
  computed: {
    backButtonRouteTo() : string {
      return `/cycle/${this.cycle}/conflict`
    },
    watcherPlayer() : PlayerOrder {
      return getWatcherPlayer(this.state, this.cycle)
    }
  },
  methods: {
    next() : void {
      if (this.cycle == 2 || this.cycle == 4) {
        this.$router.push(`/cycle/${this.cycle}/transition`)
      }
      else {
        this.$router.push(`/cycle/${this.cycle+1}/income`)
      }
    },
    getBotFaction(bot: number) : Faction {
      return getBotFaction(this.playerSetup, bot)
    }
  }
})
</script>
