<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <p v-html="t('endOfGame.mostVPWins')"></p>
  <ol>
    <li v-html="t('endOfGame.tieBattleMedals')"></li>
    <li v-html="t('endOfGame.tieInfluence')"></li>
    <li v-html="t('endOfGame.tieCredits')"></li>
    <li v-html="t('endOfGame.tieUnitsColonies')"></li>
  </ol>
  <p v-html="t('endOfGame.tieFinally')"></p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    backButtonRouteTo() : string {
      return '/cycle/4/transition'
    }
  }
})
</script>
