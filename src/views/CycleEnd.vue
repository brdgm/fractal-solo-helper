<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('cycleEnd.title')}}</h1>

  <p>TBD</p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/cycle/SideBar.vue'

export default defineComponent({
  name: 'CycleEnd',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { cycle } = navigationState
    return { t, state, cycle, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/cycle/${this.cycle}/conflict`
    }
  },
  methods: {
    next() : void {
      if (this.cycle == 2 || this.cycle == 4) {
        this.$router.push(`/cycle/${this.cycle}/transition`)
      }
      else {
        this.$router.push(`/cycle/${this.cycle+1}/income`)
      }
    }
  }
})
</script>
