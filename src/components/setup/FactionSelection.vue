<template>
  <h3 class="mt-4 mb-3">{{t('setup.factionSelection.title')}}</h3>

  <template v-for="bot in botCount" :key="bot">
    <div class="row mt-3">
      <div class="col-4 col-md-3">
        <label for="difficultyLevel" class="form-label">{{t('setup.opponent', {index:bot}, botCount)}}</label>
      </div>
      <div class="col-7 col-md-4">
        <select class="form-select"
            :value="factions[bot-1]" @input="updateFaction(bot, $event)">
          <option v-for="faction in allFactions" :key="faction" :value="faction">{{t(`faction.${faction}`)}}</option>
        </select>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import Faction from '@/services/enum/Faction'
import { useStateStore } from '@/store/state'
import getBotFaction from '@/util/getBotFaction'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FactionSelection',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const initialFactions : Faction[] = []
    for (let bot = 1; bot<=3; bot++) {
      initialFactions[bot-1] = getBotFaction(state.setup.playerSetup, bot)
    }

    const factions = ref(initialFactions)
    return { t, state, factions }
  },
  computed: {
    botCount() : number {
      return this.state.setup.playerSetup.botCount
    },
    allFactions() : Faction[] {
      return Object.values(Faction)
    }
  },
  methods: {
    updateFaction(bot : number, event: Event) {
      const faction = (event.target as HTMLInputElement).value as Faction
      this.factions[bot-1] = faction
      this.state.setup.playerSetup.botFactions = this.factions.slice(0, this.botCount)
    }
  }
})
</script>
@/util/getBotFaction