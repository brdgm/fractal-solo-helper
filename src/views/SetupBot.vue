<template>
  <h1>{{t('setupBot.title')}}</h1>

  <BotInstructions @technology="selectTechnology"/>

  <div class="row ms-1 me-1" v-if="!isTechnologiesSelected">
    <div class="col alert alert-warning" v-html="t('setupBot.technologiesMissing')"></div>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()" :disabled="!isTechnologiesSelected">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import BotInstructions from '@/components/setup/BotInstructions.vue'
import CardDeck from '@/services/CardDeck'
import getBotFaction from '@/util/getBotFaction'
import getBotDifficultyLevel from '@/util/getBotDifficultyLevel'
import FactionConfigs from '@/services/FactionConfigs'
import CampaignOption from '@/services/enum/CampaignOption'
import Technology from '@/services/enum/Technology'
import Action from '@/services/enum/Action'
import Technologies from '@/services/Technologies'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons,
    BotInstructions
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
    isCampaignOptionForgottenTechnology() : boolean {
      return (this.state.setup.campaignOptions ?? []).includes(CampaignOption.FORGOTTEN_TECHNOLOGY)
    },
    isTechnologiesSelected() : boolean {
      if (this.isCampaignOptionForgottenTechnology) {
        for (let bot=1; bot<=this.state.setup.playerSetup.botCount; bot++) {
          if (!this.selectedTechnology[bot-1] || !this.technologyAction[bot-1]) {
            return false
          }
        }
      }
      return true
    }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()

      // prepare initial bot card decks and technologies
      const playerSetup = this.state.setup.playerSetup
      const initialBotCardDecks : CardDeck[] = []
      const initialTechnologies : Technologies[] = []
      for (let bot=1; bot<=playerSetup.botCount; bot++) {
        // card deck
        const difficultyLevel = getBotDifficultyLevel(playerSetup, bot)
        const faction = getBotFaction(playerSetup, bot)
        const factionConfig = FactionConfigs.get(faction)
        initialBotCardDecks.push(CardDeck.new(difficultyLevel, factionConfig.additionalProtocolCards))

        // technologies
        const technologies = new Technologies()
        const selectedTechnology = this.selectedTechnology[bot-1]
        const technologyAction = this.technologyAction[bot-1]
        if (selectedTechnology && technologyAction) {
          if (technologyAction == Action.RESEARCH_CIVIL) {
            technologies.addCivil(selectedTechnology)
          }
          else {
            technologies.addMilitary(selectedTechnology)
          }
        }
        initialTechnologies.push(technologies)
      }
      this.state.setup.initialBotCardDecks = initialBotCardDecks.map(deck => deck.toPersistence())
      this.state.setup.initialTechnologies = initialTechnologies.map(technologies => technologies.toPersistence())

      this.$router.push('/cycle/1/income')
    },
    selectTechnology(bot:number, technology?: Technology, action?: Action) {
      this.selectedTechnology[bot-1] = technology
      this.technologyAction[bot-1] = action
    }
  }
})
</script>
