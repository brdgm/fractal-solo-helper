<template>
  <div class="sidebar">
    <p>
      {{t('sideBar.cycle')}} {{navigationState.cycle}} / 4<br/>
      <template v-if="navigationState.turn > 0">{{t('sideBar.turn')}} {{navigationState.turn}}</template>
    </p>
    <div v-if="botActions">
      {{t('sideBar.priority.title')}}
      <div>
        <div class="prioritiesLabel">{{t('sideBar.priority.unit')}}</div>
        <AppIcon v-for="unit of botActions.unitPriority" :key="unit" type="unit-type" :name="unit" class="icon"/>
      </div>
      <div>
        <div class="prioritiesLabel">{{t('sideBar.priority.colony')}}</div>
        <AppIcon v-for="colony of botActions.colonyPriority" :key="colony" type="colony-type" :name="colony" class="icon"/>
      </div>
      <div>
        <div class="prioritiesLabel">{{t('sideBar.priority.player')}}</div>
        <AppIcon v-if="botActions.playerPriorityWatcherToken" name="watcher-token" class="icon"/>
        <template v-else>
          <PlayerColorDisplay v-for="playerColor of botActions.playerPriority" :key="playerColor" :playerColor="playerColor" :sizeRem="1.5" class="icon"/>
        </template>
      </div>
      <div>
        <div class="prioritiesLabel">{{t('sideBar.priority.livingStorm')}}</div>
        <LivingStormMovementIcon :orientation="botActions.livingStormOrientation"
            :direction="botActions.livingStormDirection" class="icon"/>
      </div>
      <div>
        <div class="prioritiesLabel">{{t('sideBar.priority.behavior')}}</div>
        <button class="btn btn-secondary btn-sm" @click="openBehaviorModal">
          {{t(`rules.concepts.behavior.${botActions.behavior}.title`)}}
        </button>
      </div>
    </div>
  </div>

  <BehaviorModal/>
</template>

<script lang="ts">
import BotActions from '@/services/BotActions'
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue'
import LivingStormMovementIcon from '../structure/LivingStormMovementIcon.vue'
import BehaviorModal from '../rules/BehaviorModal.vue'
import showBehaviorModal from '@/util/showBehaviorModal'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon,
    PlayerColorDisplay,
    LivingStormMovementIcon,
    BehaviorModal
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
  computed: {
    botActions() : BotActions|undefined {
      return this.navigationState.botActions
    }
  },
  methods: {
    openBehaviorModal() {
      if (this.botActions) {
        showBehaviorModal(this.botActions.behavior)
      }
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
  margin-bottom: 10px;
  padding-right: 10px;
  @media (max-width: 600px) {
    width: 110px;
  }
}
.icon {
  height: 1.5rem;
  margin-top: 0.25rem;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  &.playerColor {
    border-radius: 5px;
  }
}
.prioritiesLabel {
  font-size: 55%;
  text-transform: uppercase;
}
</style>
