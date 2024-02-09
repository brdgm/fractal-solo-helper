<template>
  <div class="sidebar">
    <p>
      {{t('sideBar.cycle')}} {{navigationState.cycle}} / 4<br/>
      <template v-if="navigationState.turn > 0">{{t('sideBar.turn')}} {{navigationState.turn}}</template>
    </p>
    <SideBarBotInfo v-for="(botActions,index) of navigationState.botsActions" :key="index + deckUpdateCount*10"
        :navigationState="navigationState" :botActions="botActions"/>
  </div>

  <template v-for="(botActions,index) of navigationState.botsActions" :key="index + deckUpdateCount*10">
    <BehaviorModal :bot="botActions.bot"/>
    <ProtocolCardsModal :botActions="botActions" @deck-change="onDeckChange"/>
  </template>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BehaviorModal from '../rules/BehaviorModal.vue'
import SideBarBotInfo from './SideBarBotInfo.vue'
import ProtocolCardsModal from './ProtocolCardsModal.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    BehaviorModal,
    SideBarBotInfo,
    ProtocolCardsModal
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
