<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <div class="debug mb-2" v-for="(botActions,index) of navigationState.botsActions" :key="index">
      <b>[{{getBotFaction(botActions)}}#{{botActions.bot}}]</b> Active Card: {{botActions.cardDeck.actionCard?.id ?? '-'}},
      Discard: {{getDeckInfo(botActions.cardDeck.discard)}},
      Deck: {{getDeckInfo(botActions.cardDeck.deck)}},
      Reserve: {{getDeckInfo(botActions.cardDeck.reserve)}}<span v-if="botActions.cardDeck.isPass()">, pass</span><br/>
      <span v-for="(botAction,index) in botActions.actions" :key="index">
        Action {{index+1}}: {{getBotActionInfo(botAction)}}<br/>
      </span>
      Technologies: Civil {{getTechInfo(botActions.technologies.civil)}} Military {{getTechInfo(botActions.technologies.military)}}
    </div>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import BotActions, { BotAction, BotActionItem } from '@/services/BotActions'
import Card from '@/services/Card'
import Technology from '@/services/enum/Technology'
import Faction from '@/services/enum/Faction'
import getBotFaction from '@/util/getBotFaction'

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const { t } = useI18n();
    const state = useStateStore()
    return { t, state };
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  methods: {
    getBotActionInfo(botAction : BotAction) : string {
      return botAction.items.map(this.getBotActionItemInfo).join(', ')
    },
    getBotActionItemInfo(botActionItem : BotActionItem) : string {
      return botActionItem.actions.join('+')
          + (botActionItem.actionCardSlot ? ` (card #${botActionItem.actionCardSlot})` : '')
          + (botActionItem.alternative ? ' (alternative)' : '')
          + (botActionItem.fallback ? ' (fallback)' : '')
    },
    getDeckInfo(cards: readonly Card[]) : string {
      return '[' + cards
        .map(card => card.id)
        .join(',') + ']'
    },
    getTechInfo(techs: readonly Technology[]) : string {
      return `[${techs.join(',')}]`
    },
    getBotFaction(botActions: BotActions) : Faction {
      return getBotFaction(this.state.setup.playerSetup, botActions.bot)
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
