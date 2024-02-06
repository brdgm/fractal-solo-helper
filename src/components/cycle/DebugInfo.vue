<template>
  <div class="mt-4" v-if="state.setup.debugMode && botActions && cardDeck">
    <hr/>
    <p class="debug">
      Action Card: {{cardDeck.actionCard?.id}}, Support Card: {{cardDeck.supportCard?.id}}<br/>
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
import BotActions, { BotAction } from '@/services/BotActions';
import CardDeck from '@/services/CardDeck';

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
      const actions = botAction.items
              .map(item => `${item.action}${item.fallback ? ' (fallback)' : ''}`)
              .join(', ')
      return actions + (botAction.actionCardSlot ? ` / card #${botAction.actionCardSlot}` : '')
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
