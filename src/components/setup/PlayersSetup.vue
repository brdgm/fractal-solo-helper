<template>
  <h3 class="mt-4 mb-3">{{t('setup.players.title')}}</h3>

  <div class="row mt-3">
    <div class="col-4 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerCount')}}</label>
    </div>
    <div class="col-7 col-md-4">
      <select class="form-select" id="playerCount" v-model="playerCount">
        <option v-for="i in maxPlayerCount" :key="i" :value="i">{{t('setup.players.playerCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  
  <div class="row mt-3" v-for="playerColorIndex in playerCount" :key="playerColorIndex+playerColors[playerColorIndex-1]">
    <div class="col-4 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerColor', {player:t('player.human', {player:playerColorIndex}, playerCount)})}}</label>
    </div>
    <div class="col-8 col-md-9">
      <PlayerColorPicker :model-value="playerColors[playerColorIndex-1]" @update:model-value="corporation => playerColorChanged(playerColorIndex-1, corporation)"/>
    </div>
  </div>  

  <div class="row mt-3">
    <div class="col-4 col-md-3">
      <label for="botCount" class="form-label">{{t('setup.players.botCount')}}</label>
    </div>
    <div class="col-7 col-md-4">
      <select class="form-select" id="botCount" v-model="botCount">
        <option v-for="i in maxBotCount" :key="i" :value="i">{{t('setup.players.botCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  
  <div class="row mt-3" v-for="botColorIndex in botCount" :key="botColorIndex+playerColors[playerCount+botColorIndex-1]">
    <div class="col-4 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerColor', {player:t('player.bot', {bot:botColorIndex}, botCount)})}}</label>
    </div>
    <div class="col-8 col-md-9">
      <PlayerColorPicker :model-value="playerColors[playerCount+botColorIndex-1]" @update:model-value="corporation => playerColorChanged(playerCount+botColorIndex-1, corporation)"/>
    </div>
  </div>  

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import PlayerColorPicker from './PlayerColorPicker.vue'
import PlayerColor from '@/services/enum/PlayerColor'

export default defineComponent({
  name: 'PlayersSetup',
  components: {
    PlayerColorPicker
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const playerCount = ref(state.setup.playerSetup.playerCount)
    const botCount = ref(state.setup.playerSetup.botCount)
    const playerColors = ref(state.setup.playerSetup.playerColors)

    return { t, state, playerCount, botCount, playerColors }
  },
  computed: {
    maxPlayerCount() : number {
      return 4 - this.botCount
    },
    maxBotCount() : number {
      return 4 - this.playerCount
    }
  },
  watch: {
    playerCount() {
      if (this.botCount > this.maxBotCount) {
        this.botCount = this.maxBotCount
      }
      this.storePlayerSetup()
    },
    playerColors() {
      this.storePlayerSetup()
    },
    botCount() {
      if (this.playerCount > this.maxPlayerCount) {
        this.playerCount = this.maxPlayerCount
      }
      this.storePlayerSetup()
    }
  },
  methods: {
    storePlayerSetup() {
      const playerSetup = this.state.setup.playerSetup
      playerSetup.playerCount = this.playerCount
      playerSetup.botCount = this.botCount
      playerSetup.playerColors = this.playerColors
    },
    playerColorChanged(index : number, playerColor : PlayerColor) {
      const newPlayerColors = [...this.playerColors]
      newPlayerColors[index] = playerColor
      for (let i=0; i<this.playerColors.length; i++) {
        if (i!=index && newPlayerColors[i]==playerColor) {
          const newColor = Object.values(PlayerColor).find(c => !newPlayerColors.includes(c))
          if (newColor) {
            newPlayerColors[i] = newColor
          }
        }
      }
      this.playerColors = newPlayerColors
    }
  }
})
</script>
