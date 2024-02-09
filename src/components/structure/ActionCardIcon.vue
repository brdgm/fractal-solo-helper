<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 39.68 39.69" style="enable-background:new 0 0 39.68 39.69;" xml:space="preserve">
    <polygon points="2.84,0 0,2.84 0,36.85 2.84,39.69 36.85,39.69 39.68,36.85 39.68,2.84 36.85,0 "/>
    <g transform="scale(1.4) translate(-5 -5)">
      <path style="fill:#FFF;" d="M17.6,20.17l-1.61-4.42
        l-1.61,4.42c-0.26-0.16-0.5-0.36-0.7-0.59l1.84-5.05c0.15-0.02,0.31-0.04,0.47-0.04c0.16,0,0.32,0.01,0.47,0.04l1.84,5.05
        C18.1,19.8,17.86,20,17.6,20.17"/>
      <path style="fill:#FFF;" d="M18.23,15.25
        c0.09,0,0.09-0.13,0-0.13C18.14,15.12,18.14,15.25,18.23,15.25"/>
      <path style="fill:#FFF;" d="M17.49,15.46
        c0.09,0,0.09-0.13,0-0.13C17.4,15.32,17.4,15.46,17.49,15.46"/>
      <polygon style="fill:#FFF;" points="27.2,19.17 
        21.35,19.17 21.35,19.85 26.92,19.85 27.68,20.61 27.68,28.03 26.92,28.79 19.51,28.79 18.74,28.03 18.74,25.12 18.06,25.12 
        18.06,28.31 19.22,29.47 27.2,29.47 28.36,28.31 28.36,20.33 	"/>
      <path style="fill:#FFF;" d="M19.47,10.89
        c0.13,0.13,0.24,0.24,0.37,0.37l0.12,0.12v11.86c-0.09,0.09-0.17,0.17-0.24,0.25c-0.08,0.08-0.16,0.16-0.25,0.24h-6.98
        c-0.09-0.09-0.17-0.17-0.25-0.24c-0.08-0.08-0.16-0.16-0.25-0.25V11.38l0.12-0.12c0.12-0.12,0.24-0.24,0.37-0.37H19.47z
        M19.75,10.21h-7.54c-0.35,0.35-0.54,0.54-0.89,0.89v12.41c0.35,0.35,0.54,0.54,0.89,0.89h7.54c0.35-0.35,0.54-0.54,0.89-0.89V11.1
        C20.29,10.75,20.1,10.56,19.75,10.21"/>
      <text v-if="actionCardSlot" x="21" y="27" style="fill:#FFF;font-size:8px;font-family:var(--bs-body-font-family);">{{actionCardSlot}}</text>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ActionCardIcon',
  props: {
    actionCardSlot: {
      type: Number,
      required: false
    }
  }
})
</script>
