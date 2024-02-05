<template>
  <h1>{{t('player.bot', {bot}, botCount)}}</h1>

  <p>TBD</p>

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

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { cycle, turn, bot, botCount } = navigationState
    const routeCalculator = new RouteCalculator({cycle,turn,bot})
    return { t, state, cycle, turn, bot, botCount, routeCalculator }
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
        bot: this.bot
      }
      this.state.storeTurn(turn)
      this.$router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>