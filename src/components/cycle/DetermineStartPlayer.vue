<template>
  <div>
    <div v-for="playerIndex of totalPlayerCount" :key="playerIndex" class="form-check mt-2 mb-2">
      <label class="form-check-label">
        <input class="form-check-input" type="radio" v-model="startPlayer" :value="playerIndex">
        <PlayerColorDisplay :playerColor="playerColors[playerIndex-1]" :sizeRem="1.5" class="color"/>
        <span v-if="isBot(playerIndex)">{{t('player.bot',{bot:playerIndex-playerCount},botCount)}}</span>
        <span v-else>{{t('player.human',{player:playerIndex},playerCount)}}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'DetermineStartPlayer',
  components: {
    PlayerColorDisplay
  },
  emits: ['startPlayer'],
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const { playerCount, botCount, playerColors } = state.setup.playerSetup
    return { t, playerCount, botCount, playerColors }
  },
  data() {
    return {
      startPlayer: undefined as number|undefined
    }
  },
  watch: {
    startPlayer(newStartPlayer: number) {
      this.$emit('startPlayer', newStartPlayer)
    }
  },
  computed: {
    totalPlayerCount(): number {
      return this.playerCount + this.botCount
    }
  },
  methods: {
    isBot(playerIndex: number): boolean {
      return playerIndex > this.playerCount
    }
  }
})
</script>

<style lang="scss" scoped>
.color {
  margin-top: -0.25rem;
  margin-right: 0.25rem;
}
</style>
