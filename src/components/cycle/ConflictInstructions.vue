<template>
  <ol>
    <li v-if="watcherPlayer.player" v-html="resolveIconReferences(t('cycleConflict.watcherPlayer', {player:watcherPlayer.player}))"></li>
    <li v-if="watcherPlayer.bot" v-html="resolveIconReferences(t('cycleConflict.watcherBot', {faction:t(`faction.${getBotFaction(watcherPlayer.bot)}.title`)}))"></li>
    <li v-html="t('cycleConflict.placeMedals')"></li>
    <li v-html="t('cycleConflict.resolveBattles')"></li>
    <li v-html="t('cycleConflict.resolveSieges')"></li>
    <li v-html="t('cycleConflict.claimMedals')"></li>
  </ol>

  {{t('cycleConflict.militaryCapabilities')}}
  <ul>
    <li v-for="botActions of navigationState.botsActions" :key="botActions.bot">
      <div class="militaryCapabilities">
        <div class="faction">
          <PlayerColorDisplay :playerColor="getBotPlayerColor(botActions.bot)" :sizeRem="1"/>
          {{t(`faction.${getBotFaction(botActions.bot)}.title`)}}
        </div>
        <template v-for="limit of militaryTechLimits" :key="limit">
          <div class="limit" v-if="botActions.technologies.militaryTotalCost >= limit">
            <AppIcon type="card" name="technology-civil" class="icon"/> {{limit}}
          </div>
        </template>
        <div class="limit" v-if="botActions.technologies.militaryTotalCost < 3">
          -
        </div>
      </div>
    </li>
  </ul>

  <ActionRulesCollapse>
    <ul>
      <li v-html="t('rules.conflict.intro')"></li>
      <li v-html="t('rules.conflict.revealTactic')"></li>
      <li v-html="t('rules.conflict.noMatch')"></li>
      <li v-html="t('rules.conflict.shuffleTactics')"></li>
    </ul>
    <h6>{{t('rules.conflict.initiative.title')}}</h6>
    <ul>
      <li v-html="t('rules.conflict.initiative.initiativeValue')"></li>
    </ul>
    <h6>{{t('rules.conflict.unitComposition.title')}}</h6>
    <ul>
      <li v-html="t('rules.conflict.unitComposition.leftSide')"></li>
      <li v-html="t('rules.conflict.unitComposition.redIcons')"></li>
    </ul>
    <h6>{{t('rules.conflict.damage.title')}}</h6>
    <ul>
      <li v-html="t('rules.conflict.damage.rightSide')"></li>
      <li v-html="t('rules.conflict.damage.order')"></li>
      <li v-html="t('rules.conflict.damage.damageAllocation')"></li>
    </ul>
    <h6>{{t('rules.conflict.techUpgrade.title')}}</h6>
    <ul>
      <li v-html="t('rules.conflict.techUpgrade.trigger')"></li>
    </ul>
  </ActionRulesCollapse>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import Faction from '@/services/enum/Faction'
import getBotFaction from '@/util/getBotFaction'
import resolveIconReferences from '@/util/resolveIconReferences'
import NavigationState from '@/util/NavigationState'
import { PlayerOrder } from '@/util/getPlayerOrder'
import getWatcherPlayer from '@/util/getWatcherPlayer'
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue'
import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColor from '@/util/getPlayerColor'
import ActionRulesCollapse from '../rules/ActionRulesCollapse.vue'

export default defineComponent({
  name: 'ConflictInstructions',
  components: {
    AppIcon,
    PlayerColorDisplay,
    ActionRulesCollapse
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const playerSetup = state.setup.playerSetup
    return { t, state, playerSetup }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    cycle() : number {
      return this.navigationState.cycle
    },
    watcherPlayer() : PlayerOrder {
      return getWatcherPlayer(this.state, this.cycle)
    },
    militaryTechLimits() : number[] {
      return [3, 6, 9]
    }
  },
  methods: {
    getBotFaction(bot: number) : Faction {
      return getBotFaction(this.playerSetup, bot)
    },
    getBotPlayerColor(bot: number) : PlayerColor {
      return getPlayerColor(this.playerSetup, 0, bot)
    },
    resolveIconReferences(text: string) : string {
      return resolveIconReferences(text)
    }
  }
})
</script>

<style lang="scss" scoped>
.militaryCapabilities {
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
  .faction {
    width: 100px;
  }
  .limit {
    font-weight: bold;
    white-space: nowrap;
    margin-left: 15px;
  }
  .icon {
    height: 1.5rem;
    margin-top: -0.25rem;
  }
}
</style>
