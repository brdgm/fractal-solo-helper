<template>
  <div class="sidebar">
    <p>
      {{t('sideBar.cycle')}} {{navigationState.cycle}} / {{navigationState.cycleCount}}<br/>
      <template v-if="navigationState.turn > 0">{{t('sideBar.turn')}} {{navigationState.turn}}</template>
    </p>
    <SideBarBotInfo v-for="(botActions,index) of navigationState.botsActions" :key="index + deckUpdateCount*10"
        :navigationState="navigationState" :botActions="botActions"/>
  </div>

  <template v-for="(botActions,index) of navigationState.botsActions" :key="index + deckUpdateCount*10">
    <BehaviorModal :bot="botActions.bot" @performCivilResearch="performCivilResearch(botActions.bot)"
        :showPerformResearch="!navigationState.botsActionReadonly && (navigationState.bot==0 || navigationState.bot==botActions.bot)"/>
    <ProtocolCardsModal :botActions="botActions" @deckChange="onDeckChange"/>
    <PerformCivilResearchModal :botActions="botActions" @technology="(technology?,action?) => selectTechnology(botActions.bot,technology,action)"/>
  </template>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BehaviorModal from '../rules/BehaviorModal.vue'
import SideBarBotInfo from './SideBarBotInfo.vue'
import ProtocolCardsModal from './ProtocolCardsModal.vue'
import PerformCivilResearchModal from './PerformCivilResearchModal.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'
import Technology from '@/services/enum/Technology'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'SideBar',
  components: {
    BehaviorModal,
    SideBarBotInfo,
    ProtocolCardsModal,
    PerformCivilResearchModal
  },
  emits: {
    technology: (_bot: number, _technology?: Technology, _technologyAction?: Action) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars,
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      deckUpdateCount: 0
    }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  methods: {
    onDeckChange() {
      this.deckUpdateCount++
    },
    performCivilResearch(bot: number) {
      showModal(`performCivilResearchModal-${bot}`)
    },
    selectTechnology(bot: number, technology?: Technology, action?: Action) {
      this.$emit('technology', bot, technology, action)
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 160px;
  margin-right: -12px;
  margin-left: 20px;
  margin-bottom: 35px;
  padding-right: 10px;
  @media (max-width: 600px) {
    width: 118px;
  }
}
</style>
