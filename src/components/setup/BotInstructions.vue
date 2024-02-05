<template>
  <ul>
    <li>
      <span v-html="t('setupBot.factionMap')"></span>
      <ul>
        <li v-for="bot of botCount" :key="bot">
          <PlayerColorDisplay :player-color="playerColors[playerCount+bot-1]" class="color"/>
          <b>{{t(`faction.${getFaction(bot)}`)}}</b>
        </li>
      </ul>
    </li>
    <li v-html="t('setupBot.empireBoard')"></li>
    <li>
      <span v-html="t('setupBot.tacticCards')"></span>
      <ul>
        <li v-for="bot of botCount" :key="bot">
          <b>{{t(`faction.${getFaction(bot)}`)}}</b>: {{t(`setupBot.tacticCardDifficultyLevel.${getDifficultyLevel(bot)}`)}}
        </li>
      </ul>
    </li>
    <li>
      <span v-html="t('setupBot.startingUnits')"></span>
      <ul>
        <li v-for="bot of botCount" :key="bot">
          <b>{{t(`faction.${getFaction(bot)}`)}}</b>:
          <AppIcon type="colony-type" :name="getFactionConfig(bot).startingColony" class="icon colony"/>
          <AppIcon v-for="(unit,index) of getFactionConfig(bot).startingUnits" :key="index" type="unit-type" :name="unit" class="icon unit"/>
        </li>
      </ul>
    </li>
    <li>
      <span v-html="t('setupBot.singularity')"></span>
      <ul>
        <li v-for="singularityToken of singularityTokens" :key="singularityToken">
          <i v-html="t(`setupBot.singularityToken.${singularityToken}`)"></i>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Faction from '@/services/enum/Faction'
import PlayerColor from '@/services/enum/PlayerColor'
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import getBotFaction from '@/util/getBotFaction'
import getBotDifficultyLevel from '@/util/getBotDifficultyLevel'
import FactionConfig from '@/services/FactionConfig'
import FactionConfigs from '@/services/FactionConfigs'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'BotInstructions',
  components: {
    PlayerColorDisplay,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    playerCount() : number {
      return this.state.setup.playerSetup.playerCount
    },
    playerColors() : PlayerColor[] {
      return this.state.setup.playerSetup.playerColors
    },
    botCount() : number {
      return this.state.setup.playerSetup.botCount
    },
    singularityTokens() : string [] {
      return [
        'resonantMonolith',
        'openedRift',
        'forbiddenPact',
        'voidThrone',
        'taintedCivilization'
      ]
    }
  },
  methods: {
    getDifficultyLevel(bot : number) : DifficultyLevel {
      return getBotDifficultyLevel(this.state.setup.playerSetup, bot)
    },
    getFaction(bot : number) : Faction {
      return getBotFaction(this.state.setup.playerSetup, bot)
    },
    getFactionConfig(bot : number) : FactionConfig {
      return FactionConfigs.get(this.getFaction(bot));
    }
  }
})
</script>

<style lang="scss" scoped>
.color {
  height: 1rem;
  width: 1rem;
  margin-top: -0.25rem;
  margin-right: 0.25rem;
}
.icon {
  width: 1.5rem;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  margin-bottom: 0.25rem;
  &.colony {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
</style>
