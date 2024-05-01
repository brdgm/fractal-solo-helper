<template>
  <ModalDialog :id="`protocolCardsModal-${botActions.bot}`" :scrollable="true" :centered="false"
      :title="modalTitle">
    <template #body>
      <div class="option" v-if="!showLoseCard && !showReturnCard">
        <h6 v-html="t('protocolCardsModal.gainCard.title')"></h6>
        <div v-if="showGainCard" class="mb-3">
          <b>{{t('protocolCardsModal.chooseReason')}}</b>
          <div class="form-check" v-for="reason in gainProtocolCardReasons" :key="reason" >
            <label class="form-check-label">
              <input class="form-check-input" type="radio" :value="reason" v-model="gainProtocolCardReason" name="gainProtocolCardReason"
                :disabled="!isValidGainProtocolCardReason(reason)">
              <span v-html="t(`protocolCardsModal.gainCard.${reason}`)" :class="{invalidReason:!isValidGainProtocolCardReason(reason)}"></span>
            </label>
          </div>
        </div>
        <template v-else>
          {{t('protocolCardsModal.occurs')}}
          <ul>
            <li v-for="reason in gainProtocolCardReasons" :key="reason" v-html="t(`protocolCardsModal.gainCard.${reason}`)"
              :class="{invalidReason:!isValidGainProtocolCardReason(reason)}"></li>
          </ul>
        </template>
        <button v-if="!showGainCard" :disabled="cardDeck.canGainCardCount == 0"
            class="btn btn-primary" @click="setShowGainCard">{{t('protocolCardsModal.gainCard.title')}}</button>
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
        <button class="btn btn-primary" data-bs-dismiss="modal" @click="gainCard()" :disabled="!canGainProtocolCards">{{t('action.ok')}}</button>
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
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import BotActions from '@/services/BotActions'
import getBotFaction from '@/util/getBotFaction'
import Faction from '@/services/enum/Faction'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import GainProtocolCardReason from '@/services/enum/GainProtocolCardReason'

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
      gainProtocolCardReason: undefined as GainProtocolCardReason|undefined,
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
    gainProtocolCardReasons() : GainProtocolCardReason[] {
      return Object.values(GainProtocolCardReason)
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
        const maxGainCards = this.gainProtocolCardReason == GainProtocolCardReason.PRODUCTIVE_COLONY ? 2 : 1
        return Math.min(maxGainCards, this.cardDeck.canGainCardCount)
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
    },
    canGainProtocolCards() : boolean {
      return this.gainProtocolCardReason != undefined && (this.numberCards == 1 || this.gainProtocolCardReason == GainProtocolCardReason.PRODUCTIVE_COLONY)
    }
  },
  methods: {
    reset() : void {
      this.showGainCard = false
      this.showLoseCard = false
      this.showReturnCard = false
      this.gainProtocolCardReason = undefined
    },
    gainCard() : void {
      if (this.gainProtocolCardReason) {
        this.cardDeck.gainCards(this.gainProtocolCardReason, this.numberCards)
        this.$emit('deckChange')
        this.reset()
      }
    },
    loseCard() : void {
      this.cardDeck.loseCards(GainProtocolCardReason.PRODUCTIVE_COLONY, this.numberCards)
      this.$emit('deckChange')
      this.reset()
    },
    returnCard() : void {
      this.cardDeck.returnCards(this.numberCards)
      this.$emit('deckChange')
      this.reset()
    },
    setShowGainCard() : void {
      this.showGainCard = true
      if (!this.isValidGainProtocolCardReason(GainProtocolCardReason.INFLUENCE_6) && !this.isValidGainProtocolCardReason(GainProtocolCardReason.INFLUENCE_10)) {
        this.gainProtocolCardReason = GainProtocolCardReason.PRODUCTIVE_COLONY
      }
    },
    isValidGainProtocolCardReason(reason: GainProtocolCardReason) : boolean {
      return !this.cardDeck.gainProtocolCardReasons.includes(reason)
    }
  }
})
</script>

<style lang="scss" scoped>
.option + .option {
  border-top: 1px solid lightgray;
  margin-top: 10px;
  padding-top: 10px;
}
.invalidReason {
  text-decoration: line-through;
}
</style>
