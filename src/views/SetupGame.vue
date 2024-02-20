<template>
  <h1>{{t('setup.title')}}</h1>

  <PlayersSetup/>
  <FactionSelection/>
  <DifficultyLevel/>
  <CampaignSetup/>

  <RouterLink class="btn btn-primary btn-lg mt-4" to="/setupBot">
    {{t('action.next')}}
  </RouterLink>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { RouterLink } from 'vue-router'
import PlayersSetup from '@/components/setup/PlayersSetup.vue'
import FactionSelection from '@/components/setup/FactionSelection.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import CampaignSetup from '@/components/setup/CampaignSetup.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    RouterLink,
    PlayersSetup,
    FactionSelection,
    DifficultyLevel,
    CampaignSetup
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
