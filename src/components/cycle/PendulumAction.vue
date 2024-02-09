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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BotActions from '@/services/BotActions'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import Faction from '@/services/enum/Faction'
import getBotFaction from '@/util/getBotFaction'
import resolveIconReferences from '@/util/resolveIconReferences'

export default defineComponent({
  name: 'PendulumAction',
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
    botActions: {
      type: BotActions,
      required: true
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
    }
  }
})
</script>

<style type="scss" scoped>
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
