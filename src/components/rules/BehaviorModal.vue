<template>
  <ModalDialog id="rulesBehaviorModal" :size-xl="true" :scrollable="true" :centered="false"
      :title="t('rules.concepts.behavior.title')">
    <template #body>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="tablink-important-concepts" data-bs-toggle="tab" data-bs-target="#tab-important-concepts" type="button" role="tab" aria-controls="tab-important-concepts" aria-selected="false">{{t('rules.concepts.important.title')}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="tablink-behavior-victory" data-bs-toggle="tab" data-bs-target="#tab-behavior-victory" type="button" role="tab" aria-controls="tab-behavior-victory" aria-selected="true">{{t('rules.concepts.behavior.victory.title')}}</button>
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

        <!-- Important concepts -->
        <div class="tab-pane show active" id="tab-important-concepts" role="tabpanel" aria-labelledby="tablink-important-concepts" tabindex="0">
          <h6>{{t('rules.concepts.important.exploration.title')}}</h6>
          <p v-html="t('rules.concepts.important.cards.description')"></p>
          <h6>{{t('rules.concepts.important.cards.title')}}</h6>
          <p v-html="t('rules.concepts.important.training.description')"></p>
          <h6>{{t('rules.concepts.important.training.title')}}</h6>
          <p v-html="t('rules.concepts.important.training.description')"></p>
          <h6>{{t('rules.concepts.important.holdTheLine.title')}}</h6>
          <p v-html="t('rules.concepts.important.holdTheLine.description')"></p>
          <h6>{{t('rules.concepts.important.shortCircuit.title')}}</h6>
          <p v-html="t('rules.concepts.important.shortCircuit.description')"></p>
        </div>

        <!-- Victory Behavior -->
        <div class="tab-pane" id="tab-behavior-victory" role="tabpanel" aria-labelledby="tablink-behavior-victory" tabindex="0">
          <p>
            <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.controllingUtopian')"></span><br/>
            <BehaviorYesNoButtons :answers="victory" :index="0"/>
          </p>
          <div class="answer" v-show="victory.isAnswered(0)">
            <p v-show="victory.isYes(0)">
              <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.scoringSector')"></span><br/>
              <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.scoringNoValidTarget')"></span>
            </p>
            <p v-show="victory.isNo(0)">
              <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.utopianInRange')"></span><br/>
              <BehaviorYesNoButtons :answers="victory" :index="1"/>
            </p>
            <div class="answer" v-show="victory.isAnswered(1)">
              <p v-show="victory.isYes(1)">
                <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.moveToUtopian')"></span>
              </p>
              <p v-show="victory.isNo(1)">
                <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.switchDefensive')"></span>
              </p>
            </div>
          </div>
          <ActionRulesCollapse>
            <h6>{{t('rules.action.advance.title')}}</h6>
            <p v-html="t('rules.concepts.behavior.victory.advance.priorityUtopian')"></p>
            <p v-html="t('rules.concepts.behavior.victory.advance.scoringFocus')"></p>
            <p v-html="t('rules.concepts.behavior.victory.advance.scoringTie')"></p>
            <p v-html="t('rules.concepts.behavior.victory.advance.scoringNoValidTarget')"></p>
            <p v-html="t('rules.concepts.behavior.victory.advance.switchDefensive')"></p>
            <h6>{{t('rules.action.recruit.title')}}</h6>
            <p v-html="t('rules.concepts.behavior.victory.recruit.description')"></p>
          </ActionRulesCollapse>
        </div>

        <!-- Defensive Behavior -->
        <div class="tab-pane" id="tab-behavior-defensive" role="tabpanel" aria-labelledby="tablink-behavior-defensive" tabindex="0">
          <p>
            <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.besiegedColonies')"></span><br/>
            <BehaviorYesNoButtons :answers="defensive" :index="0"/>
          </p>
          <div class="answer" v-show="defensive.isAnswered(0)">
            <p v-show="defensive.isYes(0)">
              <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.defendClosestColony')"></span><br/>
              <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.defendNoValidTarget')"></span>
            </p>
            <p v-show="defensive.isNo(0)">
              <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.enemiesInRange')"></span><br/>
              <BehaviorYesNoButtons :answers="defensive" :index="1"/>
            </p>
            <div class="answer" v-show="defensive.isAnswered(1)">
              <p v-show="defensive.isYes(1)">
                <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.moveToClosestEnemy')"></span>
              </p>
              <p v-show="defensive.isNo(1)">
                <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.switchExpansive')"></span>
              </p>
            </div>
          </div>
          <ActionRulesCollapse>
            <h6>{{t('rules.action.advance.title')}}</h6>
            <p v-html="t('rules.concepts.behavior.defensive.advance.priorityReinforce')"></p>
            <p v-html="t('rules.concepts.behavior.defensive.advance.moveReinforce')"></p>
            <p v-html="t('rules.concepts.behavior.defensive.advance.opponentSpaceUnits')"></p>
            <p v-html="t('rules.concepts.behavior.defensive.advance.severalUnits')"></p>
            <p v-html="t('rules.concepts.behavior.defensive.advance.switchExpansive')"></p>
            <h6>{{t('rules.action.recruit.title')}}</h6>
            <p v-html="t('rules.concepts.behavior.defensive.recruit.description')"></p>
          </ActionRulesCollapse>
        </div>

        <!-- Aggressive Behavior -->
        <div class="tab-pane" id="tab-behavior-aggressive" role="tabpanel" aria-labelledby="tablink-behavior-aggressive" tabindex="0">
          <p>
            <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.enemyColoniesInRange')"></span><br/>
            <BehaviorYesNoButtons :answers="aggressive" :index="0"/>
          </p>
          <div class="answer" v-show="aggressive.isAnswered(0)">
            <p v-show="aggressive.isYes(0)">
              <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.moveToEnemyColony')"></span><br/>
              <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.aggressiveNoValidTarget')"></span>
            </p>
            <p v-show="aggressive.isNo(0)">
              <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.enemyUnitsInRange')"></span><br/>
              <BehaviorYesNoButtons :answers="aggressive" :index="1"/>
            </p>
            <div class="answer" v-show="aggressive.isAnswered(1)">
              <p v-show="aggressive.isYes(1)">
                <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.enforceContestedSectors')"></span>
              </p>
              <p v-show="aggressive.isNo(1)">
                <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.switchExpansive')"></span>
              </p>
            </div>
          </div>
          <ActionRulesCollapse>
            <h6>{{t('rules.action.advance.title')}}</h6>
            <p v-html="t('rules.concepts.behavior.aggressive.advance.priorityEnemyColonies')"></p>
            <p v-html="t('rules.concepts.behavior.aggressive.advance.attackColony')"></p>
            <p v-html="t('rules.concepts.behavior.aggressive.advance.contestedSector')"></p>
            <p v-html="t('rules.concepts.behavior.aggressive.advance.prioritize')"></p>
            <p v-html="t('rules.concepts.behavior.aggressive.advance.switchExpansive')"></p>
            <h6>{{t('rules.action.recruit.title')}}</h6>
            <p v-html="t('rules.concepts.behavior.aggressive.recruit.description')"></p>
          </ActionRulesCollapse>
        </div>

        <!-- Expansive Behavior -->
        <div class="tab-pane" id="tab-behavior-expansive" role="tabpanel" aria-labelledby="tablink-behavior-expansive" tabindex="0">
          <p>
            <span v-html="t('rules.concepts.behavior.expansive.advanceInteractive.colonizableSectorInRange')"></span><br/>
            <BehaviorYesNoButtons :answers="expansive" :index="0"/>
          </p>
          <div class="answer" v-show="expansive.isAnswered(0)">
            <p v-show="expansive.isYes(0)">
              <span v-html="t('rules.concepts.behavior.expansive.advanceInteractive.transportColonizableSector')"></span>
            </p>
            <p v-show="expansive.isNo(0)">
              <span v-html="t('rules.concepts.behavior.expansive.advanceInteractive.enemySectorInRange')"></span><br/>
              <BehaviorYesNoButtons :answers="expansive" :index="1"/>
            </p>
            <div class="answer" v-show="expansive.isAnswered(1)">
              <p v-show="expansive.isYes(1)">
                <span v-html="t('rules.concepts.behavior.expansive.advanceInteractive.transportEnemySector')"></span>
              </p>
              <p v-show="expansive.isNo(1)">
                <span v-html="t('rules.concepts.behavior.expansive.advanceInteractive.utopianOrReinforce')"></span>
              </p>
            </div>
          </div>
          <ActionRulesCollapse>
            <h6>{{t('rules.action.advance.title')}}</h6>
            <p v-html="t('rules.concepts.behavior.expansive.advance.priorityExpansion')"></p>
            <p v-html="t('rules.concepts.behavior.expansive.advance.transportColonizableSector')"></p>
            <p v-html="t('rules.concepts.behavior.expansive.advance.enemySectorInRange')"></p>
            <p v-html="t('rules.concepts.behavior.expansive.advance.utopianOrReinforce')"></p>
            <h6>{{t('rules.action.recruit.title')}}</h6>
            <p v-html="t('rules.concepts.behavior.expansive.recruit.description')"></p>
          </ActionRulesCollapse>
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
