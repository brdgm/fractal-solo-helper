<template>
  <div class="content-left-of-sidebar">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentLeftOfSidebar',
})
</script>

<style lang="scss" scoped>
.content-left-of-sidebar {
  margin-right: 180px;
  @media (max-width: 600px) {
    margin-right: 138px;
  }
}
</style>
