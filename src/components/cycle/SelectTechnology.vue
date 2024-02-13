<template>
  <div class="row">
    <span v-html="t('selectTechnology.selectValue')"></span><br/>
    <select class="form-select mt-2 mb-3 ms-2" v-model="technology">
      <option :value="undefined">{{t('selectTechnology.pleaseSelect')}}</option>
      <option v-for="item of technologies" :value="item" :key="item">{{item}}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Technology from '@/services/enum/Technology'
import getAllEnumValues from 'brdgm-commons/src/util/enum/getAllEnumValues'

export default defineComponent({
  name: 'SelectTechnology',
  emits: {
    technology: (_technology?: Technology) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      technology: undefined as Technology|undefined
    }
  },
  watch: {
    technology(selectedTechnology: Technology|undefined) {
      this.$emit('technology', selectedTechnology)
    }
  },
  computed: {
    technologies(): number[] {
      return getAllEnumValues(Technology)
    }
  }
})
</script>
