<template>
  <ModalDialog :id="`protocolCardsModal-${botActions.bot}`" :scrollable="true" :centered="false"
      :title="modalTitle">
    <template #body>
      <template v-if="!showLooseProtocol">
        <h6 v-html="t('protocolCardsModal.gainCard.title')"></h6>
        {{t('protocolCardsModal.occurs')}}
        <ul>
          <li v-html="t('protocolCardsModal.gainCard.productiveColony')"></li>
          <li v-html="t('protocolCardsModal.gainCard.influence')"></li>
        </ul>
        <button v-if="!showGainProtocol" :disabled="cardDeck.canGainCardCount == 0"
            class="btn btn-primary" @click="showGainProtocol=true">{{t('protocolCardsModal.gainCard.title')}}</button>
      </template>
      <template v-if="!showGainProtocol && !showLooseProtocol">
        <hr/>
      </template>
      <template v-if="!showGainProtocol">
        <h6 v-html="t('protocolCardsModal.looseCard.title')"></h6>
        {{t('protocolCardsModal.occurs')}}
        <ul>
          <li v-html="t('protocolCardsModal.looseCard.productiveColony')"></li>
        </ul>
        <button v-if="!showLooseProtocol" :disabled="cardDeck.canLooseCardCount == 0"
            class="btn btn-primary" @click="showLooseProtocol=true">{{t('protocolCardsModal.looseCard.title')}}</button>
      </template>
      <template v-if="showGainProtocol || showLooseProtocol">
        {{t('protocolCardsModal.numberCards')}}<br/>
        <select class="form-select" v-model="numberCards">
          <option v-for="count of maxNumberCards" :key="count" :value="count">{{t('protocolCardsModal.card', {count}, count)}}</option>
        </select>
      </template>
    </template>
    <template #footer>
      <template v-if="showGainProtocol">
        <button class="btn btn-primary" data-bs-dismiss="modal" @click="gainProtocol()">{{t('action.ok')}}</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal" @click="reset()">{{t('action.cancel')}}</button>
      </template>
      <template v-else-if="showLooseProtocol">
        <button class="btn btn-primary" data-bs-dismiss="modal" @click="looseProtocol()">{{t('action.ok')}}</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal" @click="reset()">{{t('action.cancel')}}</button>
      </template>
      <template v-else>
        <button class="btn btn-secondary" data-bs-dismiss="modal" @click="reset()">{{t('action.close')}}</button>
      </template>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import BotActions from '@/services/BotActions'
import getBotFaction from '@/util/getBotFaction'
import Faction from '@/services/enum/Faction'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'ProtocolCardsModal',
  components: {
    ModalDialog
  },
  emits: ['deckChange'],
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const playerSetup = state.setup.playerSetup
    return { t, playerSetup }
  },
  props: {
    botActions: {
      type: BotActions,
      required: true
    }
  },
  data() {
    return {
      showGainProtocol: false,
      showLooseProtocol: false,
      numberCards: 1
    }
  },
  computed: {
    modalTitle() : string {
      return this.t(`faction.${this.botFaction}.title`) + ': ' + this.t('protocolCardsModal.title')
    },
    botFaction() : Faction {
      return getBotFaction(this.playerSetup, this.botActions.bot)
    },
    cardDeck() : CardDeck {
      return this.botActions.cardDeck
    },
    totalCards() : number {
      return this.cardDeck.deck.length + this.cardDeck.discard.length + (this.cardDeck.actionCard ? 1 : 0)
    },
    maxNumberCards() : number {
      if (this.showLooseProtocol) {
        return Math.min(2, this.cardDeck.canLooseCardCount)
      }
      return Math.min(2, this.cardDeck.canGainCardCount)
    }
  },
  methods: {
    reset() : void {
      this.showGainProtocol = false
      this.showLooseProtocol = false
    },
    gainProtocol() : void {
      this.cardDeck.gainCards(this.numberCards)
      this.$emit('deckChange')
      this.reset()
    },
    looseProtocol() : void {
      this.cardDeck.looseCards(this.numberCards)
      this.$emit('deckChange')
      this.reset()
    }
  }
})
</script>
