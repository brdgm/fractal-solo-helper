<template>
  <ModalDialog :id="`protocolCardsModal-${botActions.bot}`" :scrollable="true" :centered="false"
      :title="modalTitle">
    <template #body>
      <div class="option" v-if="!showLoseCard && !showReturnCard">
        <h6 v-html="t('protocolCardsModal.gainCard.title')"></h6>
        {{t('protocolCardsModal.occurs')}}
        <ul>
          <li v-html="t('protocolCardsModal.gainCard.productiveColony')"></li>
          <li v-html="t('protocolCardsModal.gainCard.influence')"></li>
        </ul>
        <button v-if="!showGainCard" :disabled="cardDeck.canGainCardCount == 0"
            class="btn btn-primary" @click="showGainCard=true">{{t('protocolCardsModal.gainCard.title')}}</button>
      </div>
      <div class="option" v-if="!showGainCard && !showReturnCard">
        <h6 v-html="t('protocolCardsModal.loseCard.title')"></h6>
        {{t('protocolCardsModal.occurs')}}
        <ul>
          <li v-html="t('protocolCardsModal.loseCard.productiveColony')"></li>
        </ul>
        <button v-if="!showLoseCard" :disabled="cardDeck.canLoseCardCount == 0"
            class="btn btn-primary" @click="showLoseCard=true">{{t('protocolCardsModal.loseCard.title')}}</button>
      </div>
      <div class="option" v-if="!showGainCard && !showLoseCard && returnCardEnabled">
        <h6 v-html="t('protocolCardsModal.returnCard.title')"></h6>
        {{t('protocolCardsModal.occurs')}}
        <ul>
          <li v-html="t('protocolCardsModal.returnCard.vax117Pendulum')"></li>
        </ul>
        <button v-if="!showReturnCard" :disabled="cardDeck.canReturnCardCount == 0"
            class="btn btn-primary" @click="showReturnCard=true">{{t('protocolCardsModal.returnCard.title')}}</button>
      </div>
      <div v-if="showGainCard || showLoseCard || showReturnCard">
        {{t('protocolCardsModal.numberCards')}}<br/>
        <select class="form-select" v-model="numberCards">
          <option v-for="count of maxNumberCards" :key="count" :value="count">{{t('protocolCardsModal.card', {count}, count)}}</option>
        </select>
      </div>
    </template>
    <template #footer>
      <template v-if="showGainCard">
        <button class="btn btn-primary" data-bs-dismiss="modal" @click="gainCard()">{{t('action.ok')}}</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal" @click="reset()">{{t('action.cancel')}}</button>
      </template>
      <template v-else-if="showLoseCard">
        <button class="btn btn-primary" data-bs-dismiss="modal" @click="loseCard()">{{t('action.ok')}}</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal" @click="reset()">{{t('action.cancel')}}</button>
      </template>
      <template v-else-if="showReturnCard">
        <button class="btn btn-primary" data-bs-dismiss="modal" @click="returnCard()">{{t('action.ok')}}</button>
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
      showGainCard: false,
      showLoseCard: false,
      showReturnCard: false,
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
      if (this.showGainCard) {
        return Math.min(2, this.cardDeck.canGainCardCount)
      }
      else if (this.showLoseCard) {
        return Math.min(2, this.cardDeck.canLoseCardCount)
      }
      else if (this.showReturnCard) {
        return Math.min(1, this.cardDeck.canReturnCardCount)
      }
      return 0
    },
    returnCardEnabled() : boolean {
      return this.botFaction == Faction.VAX_117
    }
  },
  methods: {
    reset() : void {
      this.showGainCard = false
      this.showLoseCard = false
      this.showReturnCard = false
    },
    gainCard() : void {
      this.cardDeck.gainCards(this.numberCards)
      this.$emit('deckChange')
      this.reset()
    },
    loseCard() : void {
      this.cardDeck.loseCards(this.numberCards)
      this.$emit('deckChange')
      this.reset()
    },
    returnCard() : void {
      this.cardDeck.returnCards(this.numberCards)
      this.$emit('deckChange')
      this.reset()
    }
  }
})
</script>

<style type="scss" scoped>
.option + .option {
  border-top: 1px solid lightgray;
  margin-top: 10px;
  padding-top: 10px;
}
</style>
