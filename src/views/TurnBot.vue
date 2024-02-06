<template>
  <SideBar :navigationState="navigationState"/>
  <h1><PlayerColorDisplay :playerColor="playerColor" class="color"/> {{t('player.bot', {bot}, botCount)}}</h1>

  <BotActionSelection v-if="botActions" :botActions="botActions" :actionIndex="action"
      @next="next()"/>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Turn, useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import RouteCalculator from '@/services/RouteCalculator'
import PlayerColorDisplay from '@/components/structure/PlayerColorDisplay.vue'
import SideBar from '@/components/cycle/SideBar.vue'
import DebugInfo from '@/components/cycle/DebugInfo.vue'
import BotActionSelection from '@/components/cycle/BotActionSelection.vue'
import BotActions from '@/services/BotActions'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    PlayerColorDisplay,
    SideBar,
    DebugInfo,
    BotActionSelection
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { cycle, turn, bot, action, botCount, playerColor } = navigationState
    const routeCalculator = new RouteCalculator({cycle,turn,bot,action})
    return { t, state, cycle, turn, bot, action, botCount, playerColor, routeCalculator, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    },
    botActions() : BotActions|undefined {
      return this.navigationState.botActions
    }
  },
  methods: {
    next() : void {
      // store turn
      const turn : Turn = {
        cycle: this.cycle,
        turn: this.turn,
        bot: this.bot
      }
      this.state.storeTurn(turn)
      this.$router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>

<style lang="scss" scoped>
.color {
  margin-top: -0.5rem;
}
</style>
