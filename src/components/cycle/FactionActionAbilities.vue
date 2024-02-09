<template>
  <div class="row mb-3">
    <div class="col col-12" v-for="limit of civilTechnologyAbilities" :key="limit">
      <div class="ability">
        <div class="limit">
          <AppIcon type="card" name="technology-civil" class="icon"/>
          {{ limit }}
        </div>
        <div class="description" v-html="resolveIconReferences(t(`faction.${botFaction}.civilTechnologyAbility.${limit}`))"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions from '@/services/BotActions'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import Faction from '@/services/enum/Faction'
import getBotFaction from '@/util/getBotFaction'
import resolveIconReferences from '@/util/resolveIconReferences'
import Action from '@/services/enum/Action'
import FactionConfigs from '@/services/FactionConfigs'
import Technology from '@/services/enum/Technology'

export default defineComponent({
  name: 'FactionActionAbilities',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const playerSetup = state.setup.playerSetup
    return { t, playerSetup }
  },
  props: {
    action: {
      type: String as PropType<Action>,
      required: true
    },
    botActions: {
      type: BotActions,
      required: true
    },
    additionalTechnology: {
      type: Number as PropType<Technology>,
      required: false
    }
  },
  computed: {
    botFaction() : Faction {
      return getBotFaction(this.playerSetup, this.botActions.bot)
    },
    civilTotalCost() : number {
      let totalCost = this.botActions.technologies.civilTotalCost
      if (this.additionalTechnology) {
        totalCost += this.additionalTechnology
      }
      return totalCost
    },
    civilTechnologyAbilities() : number[] {
      return Object.entries(FactionConfigs.get(this.botFaction).civilTechnologyAbility)
        .filter(([,actionOrPhases]) => actionOrPhases.includes(this.action))
        .map(([limit]) => parseInt(limit))
        .filter(limit => limit <= this.civilTotalCost)
    }
  },
  methods: {
    resolveIconReferences(text: string) : string {
      return resolveIconReferences(text)
    }
  }
})
</script>

<style type="scss" scoped>
.ability {
  display: flex;
  border: 2px dashed darkgray;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  .limit {
    font-weight: bold;
    white-space: nowrap;
  }
  .description {
    margin-left: 10px;
  }
}
.icon {
  height: 1.5rem;
  margin-top: -0.25rem;
}
</style>
