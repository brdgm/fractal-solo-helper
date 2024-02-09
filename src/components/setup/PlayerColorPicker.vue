<template>
  <svg v-for="playerColor in playerColors" :key="playerColor" width="1.5rem" height="1.5rem" class="color"
      :class="{selected:playerColor==selectedPlayerColor}" @click="selectPlayerColor(playerColor)">
    <rect width="1rem" height="1rem" :style="`fill:${getColorCode(playerColor)};'`"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColorCode from '@/util/getPlayerColorCode'

export default defineComponent({
  name: 'PlayerColorPicker',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String as PropType<PlayerColor>,
      required: true
    }
  },
  data() {
    return {
      playerColors: Object.values(PlayerColor),
      selectedPlayerColor: this.modelValue
    }
  },
  methods: {
    getColorCode(playerColor: PlayerColor): string {
      return getPlayerColorCode(playerColor)
    },
    selectPlayerColor(playerColor: PlayerColor): void {
      this.selectedPlayerColor = playerColor
      this.$emit('update:modelValue', playerColor)
    }
  }    
})
</script>

<style lang="scss" scoped>
.color {
  margin-right: 0.5rem;
  border: 4px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  &.selected {
    border: 4px solid #999;
  }
}
</style>
