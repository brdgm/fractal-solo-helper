<template>
  <SideBar :navigationState="navigationState"/>
  <ContentLeftOfSidebar>
    <h1>{{t('cycleTransition.title')}}</h1>

    <ul>
      <li v-html="resolveIconReferences(t('cycleTransition.scoreVictoryPoints'))"></li>
      <li v-html="t('cycleTransition.botNoLimit')"></li>
    </ul>

    <template v-for="botActions of navigationState.botsActions" :key="botActions.bot">
      <FactionActionPhaseAbilities :botActions="botActions" :phase="phase" :showFactionName="true"/>
    </template>

    <button class="btn btn-primary btn-lg mt-4" @click="next()">
      {{t('action.next')}}
    </button>
  </ContentLeftOfSidebar>

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
import resolveIconReferences from '@/util/resolveIconReferences'
import Phase from '@/services/enum/Phase'
import FactionActionPhaseAbilities from '@/components/cycle/FactionActionPhaseAbilities.vue'
import ContentLeftOfSidebar from '@/components/cycle/ContentLeftOfSidebar.vue'

export default defineComponent({
  name: 'CycleTransition',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    FactionActionPhaseAbilities,
    ContentLeftOfSidebar
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
    },
    phase() : Phase {
      if (this.cycle == 2) {
        return Phase.TRANSITION_1
      }
      else {
        return Phase.TRANSITION_2
      }
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
    },
    resolveIconReferences(text: string) : string {
      return resolveIconReferences(text)
    }
  }
})
</script>
