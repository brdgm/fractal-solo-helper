<template>
  <h1>{{t('setupBot.title')}}</h1>

  <BotInstructions/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
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
  methods: {
    startGame() : void {
      this.state.resetGame()

      // prepare initial bot card decks
      const playerSetup = this.state.setup.playerSetup
      const initialBotCardDecks : CardDeck[] = []
      for (let bot=1; bot<=playerSetup.botCount; bot++) {
        const difficultyLevel = getBotDifficultyLevel(playerSetup, bot)
        const faction = getBotFaction(playerSetup, bot)
        const factionConfig = FactionConfigs.get(faction)
        initialBotCardDecks.push(CardDeck.new(difficultyLevel, factionConfig.additionalProtocolCards))
      }
      this.state.setup.initialBotCardDecks = initialBotCardDecks.map(deck => deck.toPersistence())

      this.$router.push('/cycle/1/income')
    }
  }
})
</script>
