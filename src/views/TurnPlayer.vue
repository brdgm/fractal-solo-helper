<template>
  <h1><PlayerColorDisplay :playerColor="playerColor"/> {{t('player.human', {player}, playerCount)}}</h1>

  <p v-html="t('turnPlayer.takeTurn')" class="mt-4"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

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

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    PlayerColorDisplay
},
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { cycle, turn, player, playerCount, playerColor } = navigationState
    const routeCalculator = new RouteCalculator({cycle,turn,player})
    return { t, state, turn, player, playerCount, playerColor, cycle, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      // store turn
      const turn : Turn = {
        cycle: this.cycle,
        turn: this.turn,
        player: this.player
      }
      this.state.storeTurn(turn)
      this.$router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>
