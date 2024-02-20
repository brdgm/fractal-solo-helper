<template>
  <ul>
    <li>
      <span v-html="t('setupBot.factionMap')"></span>
      <ul>
        <li v-for="bot of botCount" :key="bot">
          <PlayerColorDisplay :player-color="playerColors[playerCount+bot-1]" :size-rem="1" class="color"/>
          <b>{{t(`faction.${getFaction(bot)}.title`)}}</b>
        </li>
      </ul>
    </li>
    <li v-html="t('setupBot.empireBoard')"></li>
    <li>
      <span v-html="t('setupBot.tacticCards')"></span>
      <ul>
        <li v-for="bot of botCount" :key="bot">
          <b>{{t(`faction.${getFaction(bot)}.title`)}}</b>: {{t(`setupBot.tacticCardDifficultyLevel.${getDifficultyLevel(bot)}`)}}
        </li>
      </ul>
    </li>
    <li>
      <span v-html="t('setupBot.startingUnits')"></span>
      <ul>
        <li v-for="bot of botCount" :key="bot">
          <b>{{t(`faction.${getFaction(bot)}.title`)}}</b>:
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
    <li v-if="factionsWithSetupAbilities.length > 0">
      <span v-html="t('setupBot.factionSetupAbilities')"></span>
      <ul>
        <li v-for="faction of factionsWithSetupAbilities" :key="faction">
          <b>{{t(`faction.${faction}.title`)}}</b>:
          <span v-html="resolveIconReferences(t(`faction.${faction}.generalAbility.setup`))"></span>
        </li>
      </ul>
    </li>
    <li v-if="campaignOptions.length > 0">
      <span v-html="t('setupBot.campaignOptions')"></span>
      <ul>
        <li v-for="campaignOption of campaignOptions" :key="campaignOption">
          <b>{{t(`campaignOption.${campaignOption}.title`)}}</b>:
          <span v-html="resolveIconReferences(t(`campaignOption.${campaignOption}.setup`))"></span>
          <ul v-if="isCampaignOptionForgottenTechnology(campaignOption)">
            <li v-for="bot of botCount" :key="bot">
              <div>
                <b>{{t(`faction.${getFaction(bot)}.title`)}}</b>:
              </div>
              <div class="form-check form-check-inline" v-for="researchAction of researchActions" :key="researchAction">
                <label class="form-check-label">
                  <input class="form-check-input" type="radio" :name="`researchAction${bot}`" v-model="technologyAction[bot-1]" :value="researchAction" @change="selectResearchAction(bot)">
                  {{t(`rules.action.${researchAction}.title`)}}
                </label>
              </div>
              <SelectTechnology @technology="(technology) => selectTechnology(bot, technology)"/>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

  <p v-html="t('setupBot.importantInstructions')"></p>

  <BehaviorModal />
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
import BehaviorModal from '../rules/BehaviorModal.vue'
import resolveIconReferences from '@/util/resolveIconReferences'
import CampaignOption from '@/services/enum/CampaignOption'
import SelectTechnology from '../cycle/SelectTechnology.vue'
import Technology from '@/services/enum/Technology'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'BotInstructions',
  components: {
    PlayerColorDisplay,
    AppIcon,
    BehaviorModal,
    SelectTechnology
  },
  emits: {
    technology: (_bot: number, _technology?: Technology, _technologyAction?: Action) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars,
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      selectedTechnology: [] as (Technology|undefined)[],
      technologyAction: [] as (Action|undefined)[]
    }
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
    },
    factionsWithSetupAbilities() : Faction[] {
      const result : Faction[] = []
      for (let bot = 1; bot <= this.botCount; bot++) {
        const factionConfig = this.getFactionConfig(bot)
        if (factionConfig.generalAbilitySetup) {
          result.push(factionConfig.faction)
        }
      }
      return result
    },
    campaignOptions() : CampaignOption[] {
      return Object.values(CampaignOption)
        .filter(option => this.state.setup.campaignOptions?.includes(option))
    },
    researchActions() : Action[] {
      return [Action.RESEARCH_CIVIL, Action.RESEARCH_MILITARY]
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
    },
    resolveIconReferences(text: string) : string {
      return resolveIconReferences(text)
    },
    isCampaignOptionForgottenTechnology(option : CampaignOption) : boolean {
      return option === CampaignOption.FORGOTTEN_TECHNOLOGY
    },
    selectResearchAction(bot: number) : void {
      this.emitTechnology(bot)
    },
    selectTechnology(bot: number, technology?: Technology) : void {
      this.selectedTechnology[bot-1] = technology
      this.emitTechnology(bot)
    },
    emitTechnology(bot: number) : void {
      this.$emit('technology', bot, this.selectedTechnology[bot-1], this.technologyAction[bot-1])
    }
  }
})
</script>

<style lang="scss" scoped>
.color {
  margin-top: -0.25rem;
  margin-right: 0.25rem;
}
.icon {
  height: 1.4rem;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  margin-bottom: 0.25rem;
  &.colony {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
</style>
