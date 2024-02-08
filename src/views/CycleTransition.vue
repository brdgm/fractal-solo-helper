<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('cycleTransition.title')}}</h1>

  <p>TBD</p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>
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
import DebugInfo from '@/components/cycle/DebugInfo.vue'

export default defineComponent({
  name: 'CycleTransition',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo
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
      return `/cycle/${this.cycle}/end`
    }
  },
  methods: {
    next() : void {
      if (this.cycle == 4) {
        this.$router.push(`/endOfGame`)
      }
      else {
        this.$router.push(`/cycle/${this.cycle+1}/income`)
      }
    }
  }
})
</script>
