<template>
  <div class="mt-4" v-if="state.setup.debugMode && botActions && cardDeck">
    <hr/>
    <p class="debug">
      Active Card: {{cardDeck.actionCard?.id}},
      Discard: {{getDeckInfo(cardDeck.discard)}},
      Deck: {{getDeckInfo(cardDeck.deck, 1)}},
      Reserve: {{getDeckInfo(cardDeck.reserve)}}<span v-if="cardDeck.isPass()">, pass</span><br/>
      <span v-for="(botAction,index) in botActions.actions" :key="index">
        Action {{index+1}}: {{getBotActionInfo(botAction)}}<br/>
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState';
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import { useStateStore } from '@/store/state';
import BotActions, { BotAction, BotActionItem } from '@/services/BotActions';
import CardDeck from '@/services/CardDeck';
import Card from '@/services/Card';

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
  computed: {
    botActions() : BotActions|undefined {
      return this.navigationState.botActions
    },
    cardDeck() : CardDeck|undefined {
      return this.botActions?.cardDeck
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
    getDeckInfo(cards: readonly Card[], skipCards : number = 0) : string {
      return '[' + cards.slice(skipCards)
        .map(card => card.id)
        .join(',') + ']'
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
