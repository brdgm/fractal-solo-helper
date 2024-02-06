<template>
  <AppIcon v-if="isUtopian" name="living-storm-utopian"/>
  <svg v-else version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="10 10 19.68 19.69" style="enable-background:new 0 0 39.68 39.69;" xml:space="preserve">
    <g>
      <path style="fill:#000;" d="M24.05,25.47
        c-1.21,0.91-2.67,1.4-4.21,1.4c-1.54,0-3-0.49-4.21-1.4l-0.72,0.72c1.36,1.06,3.07,1.69,4.92,1.69c1.86,0,3.56-0.63,4.92-1.69
        L24.05,25.47z M13.5,14.92c-1.06,1.36-1.69,3.07-1.69,4.92c0,1.86,0.63,3.56,1.69,4.92l0.72-0.72c-0.91-1.21-1.4-2.67-1.4-4.21
        c0-1.54,0.49-3,1.4-4.21L13.5,14.92z M19.84,11.81c-1.86,0-3.56,0.63-4.92,1.69l0.72,0.72c1.21-0.91,2.67-1.4,4.21-1.4
        c1.54,0,3,0.49,4.21,1.4l0.72-0.71C23.41,12.44,21.7,11.81,19.84,11.81 M26.19,14.92l-0.72,0.72c0.91,1.21,1.4,2.67,1.4,4.21
        c0,1.54-0.49,3-1.4,4.21l0.72,0.72c1.06-1.36,1.69-3.07,1.69-4.92C27.87,17.99,27.24,16.28,26.19,14.92"
        transform="rotate(45 19.84 19.84)"/>
      <template v-if="isHorizontal">
        <polygon style="fill:#000;" points="13.82,20.11 20.91,20.11 19.12,18.33 17,19.04"/>
        <polygon style="fill:#000;" points="20.56,22.61 22.68,21.89 25.84,20.83 18.78,20.83"/>
      </template>
      <template v-else>
        <polygon style="fill:#000;" points="19.49,13.82 19.49,20.9 17.7,19.12 18.42,17"/>
        <polygon style="fill:#000;" points="21.98,20.56 21.26,22.68 20.2,25.84 20.2,18.78"/>
      </template>
      <path style="clip-path:url(#SVGID_00000100348634422987793610000011879225349651115414_);fill:#EE1E3F;" d="M27.81,20.85h-2.03
        c-0.42,2.52-2.42,4.51-4.93,4.93v2.03C24.48,27.36,27.36,24.48,27.81,20.85"
        :transform="`rotate(${directionRotation} 19.84 19.84)`"/>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LivingStormOrientation from '@/services/enum/LivingStormOrientation'
import LivingStormDirection from '@/services/enum/LivingStormDirection'
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: 'LivingStormMovement',
  components: {
    AppIcon
  },
  props: {
    orientation: {
      type: String as PropType<LivingStormOrientation>,
      required: true
    },
    direction: {
      type: String as PropType<LivingStormDirection>,
      required: true
    }
  },
  computed: {
    isUtopian() : boolean {
      return this.direction == LivingStormDirection.UTOPIAN_SECTOR
    },
    isHorizontal() : boolean {
      return this.orientation === LivingStormOrientation.HORIZONTAL
    },
    directionRotation() : number {
      switch (this.direction) {
        case LivingStormDirection.DOWN_RIGHT:
        default:
          return 0
        case LivingStormDirection.DOWN_LEFT:
          return 90
        case LivingStormDirection.UP_LEFT:
          return 180
        case LivingStormDirection.UP_RIGHT:
          return 270
      }
    }
  }
})
</script>
