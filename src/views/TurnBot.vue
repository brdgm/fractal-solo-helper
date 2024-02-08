<template>
  <SideBar :navigationState="navigationState"/>
  <h1><PlayerColorDisplay :playerColor="playerColor" class="color"/> {{t(`faction.${botFaction}`)}}</h1>

  <BotActionSelection v-if="botActions" :botActions="botActions" :actionIndex="action"
      @next="next()" @technology="selectTechnology"/>

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
import Faction from '@/services/enum/Faction'
import getBotFaction from '@/util/getBotFaction'
import Technology from '@/services/enum/Technology'
import Action from '@/services/enum/Action'

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
    const { cycle, turn, bot, action, stateIndex,
        botCount, playerColor } = navigationState
    const playerSetup = state.setup.playerSetup
    const routeCalculator = new RouteCalculator({cycle,turn,bot,action})
    return { t, state, cycle, turn, bot, action, stateIndex,
        botCount, playerColor, playerSetup, routeCalculator, navigationState }
  },
  data() {
    return {
      selectedTechnology: undefined as Technology|undefined,
      technologyAction: undefined as Action|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    },
    botActions() : BotActions|undefined {
      return this.navigationState.botActions
    },
    isPass() : boolean {
      return this.action == 2 && (this.botActions?.cardDeck.isPass() ?? false)
    },
    botFaction() : Faction {
      return getBotFaction(this.playerSetup, this.bot)
    }
  },
  methods: {
    next() : void {
      // store turn
      if (this.botActions) {
        if (this.selectedTechnology && this.technologyAction) {
          if (this.technologyAction == Action.RESEARCH_CIVIL) {
            this.botActions.technologies.addCivil(this.selectedTechnology)
          }
          else {
            this.botActions.technologies.addMilitary(this.selectedTechnology)
          }
        }
        const turn : Turn = {
          stateIndex: this.stateIndex,
          cycle: this.cycle,
          turn: this.turn,
          bot: this.bot,
          action: this.action,
          botsActions: this.navigationState.botsActions.map(botActions => botActions.toPersistence())
        }
        if (this.isPass && this.action == 2) {
          turn.passed = true
        }
        this.state.storeTurn(turn)
      }
      this.$router.push(this.routeCalculator.getNextRouteTo(this.state))
    },
    selectTechnology(technology?: Technology, action?: Action) {
      this.selectedTechnology = technology
      this.technologyAction = action
    }
  }
})
</script>

<style lang="scss" scoped>
.color {
  margin-top: -0.5rem;
}
</style>
