<template>
  <ModalDialog id="rulesBehaviorModal" :size-xl="true" :scrollable="true" :centered="false"
      :title="t('rules.concepts.behavior.title')">
    <template #body>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="tablink-behavior-victory" data-bs-toggle="tab" data-bs-target="#tab-behavior-victory" type="button" role="tab" aria-controls="tab-behavior-victory" aria-selected="true">{{t('rules.concepts.behavior.victory.title')}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="tablink-behavior-defensive" data-bs-toggle="tab" data-bs-target="#tab-behavior-defensive" type="button" role="tab" aria-controls="tab-behavior-defensive" aria-selected="false">{{t('rules.concepts.behavior.defensive.title')}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="tablink-behavior-aggressive" data-bs-toggle="tab" data-bs-target="#tab-behavior-aggressive" type="button" role="tab" aria-controls="tab-behavior-aggressive" aria-selected="false">{{t('rules.concepts.behavior.aggressive.title')}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="tablink-behavior-expansive" data-bs-toggle="tab" data-bs-target="#tab-behavior-expansive" type="button" role="tab" aria-controls="tab-behavior-expansive" aria-selected="false">{{t('rules.concepts.behavior.expansive.title')}}</button>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane show active" id="tab-behavior-victory" role="tabpanel" aria-labelledby="tablink-behavior-victory" tabindex="0">
          <p>TBD victory...</p>
        </div>
        <div class="tab-pane" id="tab-behavior-defensive" role="tabpanel" aria-labelledby="tablink-behavior-defensive" tabindex="0">
          <p>
            Are there besieged colonies not under the Automata's control in range?<br/>
            <BehaviorYesNoButtons :answers="defensive" :index="0"/>
          </p>
          <div class="answer" v-show="defensive.isAnswered(0)">             
            <p v-show="defensive.isYes(0)">
              Move to defend the closest colony.<br/>
              <b>No valid target:</b> <a href='#tablink-behavior-aggressive' data-custom-toggle='tab'>Aggressive AI behavior</a>.
            </p>
            <p v-show="defensive.isNo(0)">
              Are there enemy space units currently not pinned-down in range?<br/>
              <BehaviorYesNoButtons :answers="defensive" :index="1"/>
            </p>
            <div class="answer" v-show="defensive.isAnswered(1)">
              <p v-show="defensive.isYes(1)">
                Move to the closest enemy space units not pinned-down.
              </p>
              <p v-show="defensive.isNo(1)">
                Expansive AI behavior.
              </p>
            </div>
          </div>
          <ActionRulesCollapse>
            <p>The Automata’s priority is to reinforce its besieged colonies. Before each separate movement, check if any Automata colonies in range contain more enemy units than the Automata’s.</p>
            <p>If there are, move <i>space units</i> there, transporting the maximum number of <i>ground units</i> to reinforce the sector. If several colonies are under siege, choose the closest one and, if tied, the priority one. If several space units are in range, use the <i>Hold the line</i> rule to break the tie. If there are colonies under siege but the Automata cannot move its units to defend the sector, it triggers the <i>Aggressive behavior</i> instead.</p>
            <p>If there are no besieged colonies, check whether the opponent has <i>space units</i> in range that are not pinned-down, i.e., not currently engaged with the Automata’s (or another opponent’s) <i>space units</i>. If there are, move the closest Automata units to engage.</p>
            <p>If several units are in range, choose the priority units. If several Automata units can engage, use the priority units to determine which ones move.</p>
            <p>Finally, if no options are available, the Automata triggers the <i>Expansive behavior</i> instead.</p>
          </ActionRulesCollapse>
        </div>
        <div class="tab-pane" id="tab-behavior-aggressive" role="tabpanel" aria-labelledby="tablink-behavior-aggressive" tabindex="0">
          <p>TBD aggressive...</p>
        </div>
        <div class="tab-pane" id="tab-behavior-expansive" role="tabpanel" aria-labelledby="tablink-behavior-expansive" tabindex="0">
          <p>TBD expansive...</p>
        </div>
      </div>
    </template>
    <template #footer>
      <button class="btn btn-secondary" @click="reset()">{{t('action.reset')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import BehaviorAnswers from '@/services/BehaviorAnswers'
import BehaviorYesNoButtons from './BehaviorYesNoButtons.vue'
import ActionRulesCollapse from './ActionRulesCollapse.vue'
import enableTabLinksInContent from 'brdgm-commons/src/util/tab/enableTabLinksInContent'

export default defineComponent({
  name: 'BehaviorModal',
  components: {
    ModalDialog,
    BehaviorYesNoButtons,
    ActionRulesCollapse
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      victory: new BehaviorAnswers(),
      defensive: new BehaviorAnswers(),
      aggressive: new BehaviorAnswers(),
      expansive: new BehaviorAnswers()
    }
  },
  methods: {
    reset() : void {
      this.victory.reset()
      this.defensive.reset()
      this.aggressive.reset()
      this.expansive.reset()
    }
  },
  mounted() {
    enableTabLinksInContent(this.$el as HTMLElement)
  }
})
</script>

<style type="scss" scoped>
.answer {
  margin-left: 1rem;
}
.answer::before {
  content: '↳';
  float: left;
  margin-right: 0.25rem;
  height: 2rem;
}
</style>
