<template>
  <div class="row">
    <div class="col col-12 col-sm-6" v-for="index of 2" :key="index">
      <div class="pendulum">
        <div class="title">
          <AppIcon type="card" name="action" class="icon"/>
          {{t(`faction.${botFaction}.pendulum${index}.title`)}}
        </div>
        <div class="condition" v-html="resolveIconReferences(t(`faction.${botFaction}.pendulum${index}.condition`))"></div>
        <div class="description" v-html="resolveIconReferences(t(`faction.${botFaction}.pendulum${index}.description`))"></div>
        <div v-if="isVAX117Pendulum1(index)">
          <button class="btn btn-sm btn-secondary mt-2 me-2" @click="performCivilResearch">{{t('rules.action.research-civil.title')}}</button>
          <button class="btn btn-sm btn-secondary mt-2" @click="performMilitaryResearch">{{t('rules.action.research-military.title')}}</button>
        </div>
      </div>
      <FactionActionPhaseAbilities :phase="getPendulumPhase(index)" :botActions="botActions"/>
      <div v-if="isVAX117Pendulum1(index)">
        <ActionResearchCivil v-if="performResearchAction && isCivilResearchAction()"
            :action="performResearchAction" :botActionItem="botActionItem" :botActions="botActions" @technology="selectTechnology"/>
        <ActionResearchMilitary v-if="performResearchAction && isMilitaryResearchAction()"
            :action="performResearchAction" :botActionItem="botActionItem" :botActions="botActions"  @technology="selectTechnology"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions, { BotActionItem } from '@/services/BotActions'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import Faction from '@/services/enum/Faction'
import getBotFaction from '@/util/getBotFaction'
import resolveIconReferences from '@/util/resolveIconReferences'
import Phase from '@/services/enum/Phase'
import FactionActionPhaseAbilities from './FactionActionPhaseAbilities.vue'
import Action from '@/services/enum/Action'
import Technology from '@/services/enum/Technology'
import ActionResearchCivil from './action/ActionResearchCivil.vue'
import ActionResearchMilitary from './action/ActionResearchMilitary.vue'

export default defineComponent({
  name: 'PendulumAction',
  components: {
    AppIcon,
    FactionActionPhaseAbilities,
    ActionResearchCivil,
    ActionResearchMilitary
  },
  emits: {
    technology: (_technology?: Technology, _technologyAction?: Action) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars,
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const playerSetup = state.setup.playerSetup
    return { t, playerSetup }
  },
  props: {
    botActionItem: {
      type: Object as PropType<BotActionItem>,
      required: true
    },
    botActions: {
      type: BotActions,
      required: true
    }
  },
  data() {
    return {
      performResearchAction: undefined as Action|undefined
    }
  },
  computed: {
    botFaction() : Faction {
      return getBotFaction(this.playerSetup, this.botActions.bot)
    }
  },
  methods: {
    resolveIconReferences(text: string) : string {
      return resolveIconReferences(text)
    },
    getPendulumPhase(index: number) : Phase|undefined {
      if (index == 1) {
        return Phase.PENDULUM_1
      }
      else if (index == 2) {
        return Phase.PENDULUM_2
      }
      return undefined
    },
    isVAX117Pendulum1(index: number) {
      return this.botFaction == Faction.VAX_117 && index == 1
    },
    performCivilResearch() {
      this.performResearchAction = Action.RESEARCH_CIVIL
    },
    performMilitaryResearch() {
      this.performResearchAction = Action.RESEARCH_MILITARY
    },
    isCivilResearchAction() {
      return this.performResearchAction == Action.RESEARCH_CIVIL
    },
    isMilitaryResearchAction() {
      return this.performResearchAction == Action.RESEARCH_MILITARY
    },
    selectTechnology(technology?: Technology, action?: Action) {
      this.$emit('technology', technology, action)
    }
  }
})
</script>

<style lang="scss" scoped>
.pendulum {
  border: 2px dashed darkgray;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  padding: 10px;
  text-align: center;
  .title {
    font-weight: bold;
    img {
      float: left;
    }
  }
  .condition {
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
.icon {
  height: 1.5rem;
}
</style>
