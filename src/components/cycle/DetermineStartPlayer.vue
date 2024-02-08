<template>
  <div>
    <div v-for="playerIndex of totalPlayerCount" :key="playerIndex" class="form-check mt-2 mb-2">
      <label class="form-check-label">
        <input class="form-check-input" type="radio" v-model="startPlayer" :value="playerIndex">
        <PlayerColorDisplay :playerColor="playerColors[playerIndex-1]" :sizeRem="1.5" class="color"/>
        <span v-if="isBot(playerIndex)">{{t(`faction.${getBotFaction(playerIndex)}`)}}</span>
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
import getBotFaction from '@/util/getBotFaction'
import Faction from '@/services/enum/Faction'

export default defineComponent({
  name: 'DetermineStartPlayer',
  components: {
    PlayerColorDisplay
  },
  emits: ['startPlayer'],
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const playerSetup = state.setup.playerSetup
    const { playerCount, botCount, playerColors } = playerSetup
    return { t, playerCount, botCount, playerColors, playerSetup }
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
    },
    getBotFaction(playerIndex : number) : Faction {
      return getBotFaction(this.playerSetup, playerIndex - this.playerCount)
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
