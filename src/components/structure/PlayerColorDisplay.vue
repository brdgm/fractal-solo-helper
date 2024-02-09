<template>
  <svg :width="`${sizeRem}rem`" :height="`${sizeRem}rem`" class="color">
    <rect :width="`${sizeRem}rem`" :height="`${sizeRem}rem`" :rx="`${sizeRem * 0.2}rem`"
        :style="`fill:${getColorCode(playerColor)};'`"/>
  </svg>
</template>

<script lang="ts">
import PlayerColor from '@/services/enum/PlayerColor'
import { defineComponent, PropType } from 'vue'
import getPlayerColorCode from '@/util/getPlayerColorCode'

export default defineComponent({
  name: 'PlayerColorDisplay',
  props: {
    playerColor: {
      type: String as PropType<PlayerColor>,
      required: true
    },
    sizeRem: {
      type: Number,
      default: 2
    }
  },
  methods: {
    getColorCode(color : PlayerColor) : string {
      return getPlayerColorCode(color)
    }
  }
})
</script>
