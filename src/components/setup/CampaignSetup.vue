<template>
  <h3 class="mt-4 mb-3">{{t('setup.campaign.title')}}</h3>

  <div class="mb-1" v-if="!show">
    <button class="btn btn-sm btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#campaignOptionSelection" aria-expanded="false" aria-controls="campaignOptionSelection" @click="show=true">
      {{t('setup.campaign.show')}}
    </button>
  </div>
  <div class="collapse" id="campaignOptionSelection">
    <p class="fst-italic text-muted" v-html="t('setup.campaign.intro')"></p>
    <div class="row">
      <div class="col">
        <div class="form-check form-switch" v-for="item of campaignOptions" :key="item">
          <input class="form-check-input" type="checkbox" :id="`expansion-${item}`" :checked="hasCampaignOption(item)" @input="toggleCampaignOption(item)">
          <label class="form-check-label" :for="`expansion-${item}`">
            <b>{{t(`campaignOption.${item}.title`)}}</b>:
            <span v-html="t(`campaignOption.${item}.description`)"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'
import CampaignOption from '@/services/enum/CampaignOption'

export default defineComponent({
  name: 'CampaignSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    campaignOptions() : CampaignOption[] {
      return Object.values(CampaignOption)
    }
  },
  methods: {
    hasCampaignOption(campaignOption : CampaignOption) : boolean {
      return (this.state.setup.campaignOptions ?? []).includes(campaignOption)
    },
    toggleCampaignOption(campaignOption : CampaignOption) {
      if (!this.state.setup.campaignOptions) {
        this.state.setup.campaignOptions = []
      }
      // FALLEN_GALAXY and RUINS_OF_EMPIRE are mutually exclusive
      if (campaignOption === CampaignOption.FALLEN_GALAXY) {
        this.state.setup.campaignOptions = this.state.setup.campaignOptions.filter(option => option !== CampaignOption.RUINS_OF_EMPIRE)
      }
      if (campaignOption === CampaignOption.RUINS_OF_EMPIRE) {
        this.state.setup.campaignOptions = this.state.setup.campaignOptions.filter(option => option !== CampaignOption.FALLEN_GALAXY)
      }
      toggleArrayItem(this.state.setup.campaignOptions, campaignOption)
    }
  }
})
</script>
