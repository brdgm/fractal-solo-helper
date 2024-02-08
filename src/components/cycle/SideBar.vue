<template>
  <div class="sidebar">
    <p>
      {{t('sideBar.cycle')}} {{navigationState.cycle}} / 4<br/>
      <template v-if="navigationState.turn > 0">{{t('sideBar.turn')}} {{navigationState.turn}}</template>
    </p>
    <SideBarBotInfo v-for="(botActions,index) of navigationState.botsActions" :key="index"
        :navigationState="navigationState" :botActions="botActions"/>
  </div>

  <BehaviorModal/>
</template>

<script lang="ts">
import BotActions from '@/services/BotActions'
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BehaviorModal from '../rules/BehaviorModal.vue'
import SideBarBotInfo from './SideBarBotInfo.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    BehaviorModal,
    SideBarBotInfo
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  methods: {
    getProtocolStatus(botActions: BotActions) : string {
      const cardDeck = botActions.cardDeck
      const played = cardDeck.discard.length + (cardDeck.actionCard ? 1 : 0)
      const total = cardDeck.deck.length + played
      return `${played}/${total}`
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
