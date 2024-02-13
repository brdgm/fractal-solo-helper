<template>
  <ModalDialog :id="`performCivilResearchModal-${botActions.bot}`" :scrollable="true" :centered="false">
    <template #body>
      <div class="container container-fluid">
        <ActionResearchCivil :action="researchCivilAction" :botActions="botActions" @technology="selectTechnology"/>
      </div>
    </template>
    <template #footer>
      <button class="btn btn-primary" data-bs-dismiss="modal" @click="storeTechnology"
          :disabled="!selectedTechnology">{{t('action.ok')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import BotActions from '@/services/BotActions'
import CardDeck from '@/services/CardDeck'
import ActionResearchCivil from './action/ActionResearchCivil.vue'
import Action from '@/services/enum/Action'
import Technology from '@/services/enum/Technology'

export default defineComponent({
  name: 'PerformCivilResearchModal',
  components: {
    ModalDialog,
    ActionResearchCivil
  },
  emits: {
    technology: (_technology?: Technology, _technologyAction?: Action) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars,
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    botActions: {
      type: BotActions,
      required: true
    }
  },
  data() {
    return {
      selectedTechnology: undefined as Technology|undefined,
      technologyAction: undefined as Action|undefined
    }
  },
  computed: {
    cardDeck() : CardDeck {
      return this.botActions.cardDeck
    },
    researchCivilAction() : Action {
      return Action.RESEARCH_CIVIL
    }
  },
  methods: {
    selectTechnology(technology?: Technology, action?: Action) {
      this.selectedTechnology = technology
      this.technologyAction = action
    },
    storeTechnology() {
      this.$emit('technology', this.selectedTechnology, this.technologyAction)
    }
  }
})
</script>
