<template>
  <h3 class="mt-4 mb-3">{{t('setup.difficultyLevel.title')}}</h3>

  <template v-for="bot in botCount" :key="bot">
    <h6 v-if="botCount > 1">{{t('setup.opponent', {index:bot}, botCount)}}</h6>
    <div class="row">
      <div class="col-2 col-lg-1 text-end">
        <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.easy')}}</label>
      </div>
      <div class="col-8 col-lg-4">
        <input type="range" class="form-range" min="1" max="3" id="difficultyLevel"
            :value="levels[bot-1]" @input="updateDifficultyLevel(bot, $event)">
      </div>
      <div class="col-2 col-lg-1">
        <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.hard')}}</label>
      </div>
    </div>
    <div class="row">
      <div class="offset-2 offset-lg-1 col-8 col-lg-4 text-muted small">
        {{t(`difficultyLevel.${levels[bot-1]}`)}}
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { useStateStore } from '@/store/state'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DifficultyLevel',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const initialLevels : number[] = []
    for (let bot = 1; bot<=3; bot++) {
      initialLevels[bot-1] = state.setup.playerSetup.botDifficultyLevel[bot-1] || DifficultyLevel.NORMAL
    }

    const levels = ref(initialLevels)
    return { t, state, levels }
  },
  computed: {
    botCount() : number {
      return this.state.setup.playerSetup.botCount
    }
  },
  methods: {
    updateDifficultyLevel(bot : number, event: Event) {
      const level = parseInt((event.target as HTMLInputElement).value)
      this.levels[bot-1] = level
      this.state.setup.playerSetup.botDifficultyLevel = this.levels.slice(0, this.botCount)
    }
  }
})
</script>
