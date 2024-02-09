<template>
  <div class="botInfo">
    <div class="header" data-bs-toggle="collapse" :data-bs-target="`#${bodyId}`">
      <PlayerColorDisplay :playerColor="botPlayerColor" :sizeRem="1"/>
      {{t(`faction.${botFaction}.title`)}}
    </div>
    <div class="body collapse" :class="{show:isCurrentBot}" :id="bodyId">
      <template v-if="cardDeck.actionCard && cardDeck.supportCard">
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
            <PlayerColorDisplay v-for="playerColor of botActions.playerPriority" :key="playerColor" :playerColor="playerColor" :sizeRem="1.75" class="icon playerColor"/>
          </template>
        </div>
        <div>
          <div class="prioritiesLabel">{{t('sideBar.priority.livingStorm')}}</div>
          <LivingStormMovementIcon :orientation="botActions.livingStormOrientation"
              :direction="botActions.livingStormDirection" class="icon"/>
        </div>
        <div>
          <div class="prioritiesLabel">{{t('sideBar.behavior')}}</div>
          <BehaviorButton :bot="botActions.bot" :behavior="botActions.behavior"/>
        </div>
      </template>
      <div class="mt-2 icon-card-list">
        <div class="list-item">
          <AppIcon type="card" name="protocol" class="icon protocol"/>
          <div class="value">{{protocolStatus}} </div>
        </div>
        <div class="list-item">
          <AppIcon type="card" name="technology-civil" class="icon"/>
          <div class="value">{{botActions.technologies.civilTotalCost}}</div>
        </div>
        <div class="list-item">
          <AppIcon type="card" name="technology-military" class="icon"/>
          <div class="value">{{botActions.technologies.militaryTotalCost}}</div>
        </div>
      </div>
      <button class="btn btn-sm btn-secondary mt-2" :disabled="navigationState.botsActionReadonly"
          data-bs-toggle="modal" :data-bs-target="`#protocolCardsModal-${botActions.bot}`">{{t('protocolCardsModal.title')}}</button>
    </div>
  </div>
</template>

<script lang="ts">
import BotActions from '@/services/BotActions'
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue'
import LivingStormMovementIcon from '../structure/LivingStormMovementIcon.vue'
import BehaviorButton from '../rules/BehaviorButton.vue'
import CardDeck from '@/services/CardDeck'
import Faction from '@/services/enum/Faction'
import getBotFaction from '@/util/getBotFaction'
import { useStateStore } from '@/store/state'
import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColor from '@/util/getPlayerColor'

export default defineComponent({
  name: 'SideBarBotInfo',
  components: {
    AppIcon,
    PlayerColorDisplay,
    LivingStormMovementIcon,
    BehaviorButton
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const playerSetup = state.setup.playerSetup
    return { t, playerSetup }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    botActions: {
      type: BotActions,
      required: true
    }
  },
  computed: {
    bodyId() : string {
      return `sidebar-body-bot-${this.botActions.bot}`
    },
    isCurrentBot() : boolean {
      return this.navigationState.bot === this.botActions.bot
    },
    botFaction() : Faction {
      return getBotFaction(this.playerSetup, this.botActions.bot)
    },
    botPlayerColor() : PlayerColor {
      return getPlayerColor(this.playerSetup, 0, this.botActions.bot)
    },
    cardDeck() : CardDeck {
      return this.botActions.cardDeck
    },
    protocolStatus() : string {
      const total = this.cardDeck.totalCards
      const played = total - this.cardDeck.deck.length
      return `${played}/${total}`
    }
  }
})
</script>

<style lang="scss" scoped>
.botInfo {
  border-left: 1px solid #aaa;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-right: -10px;
  .header {
    background-color: #000;
    border-top-left-radius: 5px;
    color: #fff;
    padding-left: 3px;
    padding-bottom: 3px;
    cursor: pointer;
    svg {
      margin-top: -0.2rem;
    }
    @media (max-width: 600px) {
      padding: -3px -3px 0 -3px;
    }
  }
  .body {
    padding: 5px;
    &.collapsing {
      transition: none;
    }
  }
}
.icon {
  height: 1.75rem;
  margin-top: 0.25rem;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  &.protocol {
    height: 1.25rem;
  }
  @media (max-width: 600px) {
    height: 1.25rem;
    &.protocol {
      height: 0.9rem;
    }
    &.playerColor {
      width: 1.25rem;
      border-radius: 5px;
    }
  }
}
.icon-card-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .list-item {
    display: flex;
    align-items: center;
  }
  .value {
    margin-right: 0.5rem;
    @media (max-width: 600px) {
      margin-right: 0.25rem;
      font-size: small;
    }
  }
}
.icon-card {
  height: 1rem;
}
.prioritiesLabel {
  font-size: 55%;
  text-transform: uppercase;
}
</style>
