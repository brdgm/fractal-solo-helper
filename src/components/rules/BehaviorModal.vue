<template>
  <ModalDialog :id="`rulesBehaviorModal${botSuffix}`" :size-xl="true" :scrollable="true" :centered="false"
      :title="t('rules.concepts.behavior.title',{botSuffix})">
    <template #body>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" :id="`tablink-important-concepts${botSuffix}`" data-bs-toggle="tab" :data-bs-target="`#tab-important-concepts${botSuffix}`" type="button" role="tab" :aria-controls="`tab-important-concepts${botSuffix}`" aria-selected="true">{{t('rules.concepts.important.title',{botSuffix})}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :id="`tablink-empire-tracks${botSuffix}`" data-bs-toggle="tab" :data-bs-target="`#tab-empire-tracks${botSuffix}`" type="button" role="tab" :aria-controls="`tab-empire-tracks${botSuffix}`" aria-selected="true">{{t('rules.concepts.empireTracks.title',{botSuffix})}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :id="`tablink-behavior-victory${botSuffix}`" data-bs-toggle="tab" :data-bs-target="`#tab-behavior-victory${botSuffix}`" type="button" role="tab" :aria-controls="`tab-behavior-victory${botSuffix}`" aria-selected="false">{{t('rules.concepts.behavior.victory.title',{botSuffix})}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :id="`tablink-behavior-defensive${botSuffix}`" data-bs-toggle="tab" :data-bs-target="`#tab-behavior-defensive${botSuffix}`" type="button" role="tab" :aria-controls="`tab-behavior-defensive${botSuffix}`" aria-selected="false">{{t('rules.concepts.behavior.defensive.title',{botSuffix})}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :id="`tablink-behavior-aggressive${botSuffix}`" data-bs-toggle="tab" :data-bs-target="`#tab-behavior-aggressive${botSuffix}`" type="button" role="tab" :aria-controls="`tab-behavior-aggressive${botSuffix}`" aria-selected="false">{{t('rules.concepts.behavior.aggressive.title',{botSuffix})}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" :id="`tablink-behavior-expansive${botSuffix}`" data-bs-toggle="tab" :data-bs-target="`#tab-behavior-expansive${botSuffix}`" type="button" role="tab" :aria-controls="`tab-behavior-expansive${botSuffix}`" aria-selected="false">{{t('rules.concepts.behavior.expansive.title',{botSuffix})}}</button>
        </li>
      </ul>
      <div class="tab-content">

        <!-- Important concepts -->
        <div class="tab-pane show active" :id="`tab-important-concepts${botSuffix}`" role="tabpanel" :aria-labelledby="`tablink-important-concepts${botSuffix}`" tabindex="0">
          <h6>{{t('rules.concepts.important.exploration.title',{botSuffix})}}</h6>
          <p v-html="t('rules.concepts.important.exploration.description',{botSuffix})"></p>
          <h6>{{t('rules.concepts.important.cards.title',{botSuffix})}}</h6>
          <p v-html="t('rules.concepts.important.cards.description',{botSuffix})"></p>
          <h6>{{t('rules.concepts.important.training.title',{botSuffix})}}</h6>
          <p v-html="t('rules.concepts.important.training.description',{botSuffix})"></p>
          <h6>{{t('rules.concepts.important.holdTheLine.title',{botSuffix})}}</h6>
          <p v-html="t('rules.concepts.important.holdTheLine.description',{botSuffix})"></p>
          <h6>{{t('rules.concepts.important.shortCircuit.title',{botSuffix})}}</h6>
          <p v-html="t('rules.concepts.important.shortCircuit.description',{botSuffix})"></p>
          <h6>{{t('rules.concepts.important.protocolCards.title',{botSuffix})}}</h6>
          <p v-html="t('rules.concepts.important.protocolCards.description',{botSuffix})"></p>
          <h6>{{t('rules.concepts.important.damageAllocation.title',{botSuffix})}}</h6>
          <p v-html="resolveIconReferences(t('rules.concepts.important.damageAllocation.sufferingDamage',{botSuffix}))"></p>
          <p v-html="resolveIconReferences(t('rules.concepts.important.damageAllocation.assignDamage',{botSuffix}))"></p>
        </div>

        <!-- Empire tracks -->
        <div class="tab-pane" :id="`tab-empire-tracks${botSuffix}`" role="tabpanel" :aria-labelledby="`tablink-empire-tracks${botSuffix}`" tabindex="0">
          <template v-for="empireTrack of empireTracks" :key="empireTrack">
            <h5>{{t(`rules.concepts.empireTracks.${empireTrack}.title`,{botSuffix})}}</h5>
            <table class="table table-striped table-bordered table-light">
              <thead>
                <tr>
                  <th scope="col">{{t('rules.concepts.empireTracks.header.colony',{botSuffix})}}</th>
                  <th scope="col">{{t('rules.concepts.empireTracks.header.bonus',{botSuffix})}}</th>
                  <th scope="col">{{t('rules.concepts.empireTracks.header.effect',{botSuffix})}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(_index,colony) of 4" :key="colony">
                  <td v-html="t(`rules.concepts.empireTracks.colony.${colony}`,{botSuffix})"></td>
                  <td v-if="(empireTrack == 'imperial' && colony > 0) || (empireTrack == 'scientific' || empireTrack == 'military') && colony > 1"
                      v-html="t(`rules.concepts.empireTracks.${empireTrack}.bonus.${colony}`,{botSuffix})"></td>
                  <td v-else></td>
                  <td v-html="t(`rules.concepts.empireTracks.${empireTrack}.effect.${colony}`,{botSuffix})"></td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>

        <!-- Victory Behavior -->
        <div class="tab-pane" :id="`tab-behavior-victory${botSuffix}`" role="tabpanel" :aria-labelledby="`tablink-behavior-victory${botSuffix}`" tabindex="0">
          <p>
            <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.controllingUtopian',{botSuffix})"></span><br/>
            <BehaviorYesNoButtons :answers="victory" :index="0"/>
          </p>
          <div class="answer" v-show="victory.isAnswered(0)">
            <p v-show="victory.isYes(0)">
              <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.scoringSector',{botSuffix})"></span><br/>
              <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.scoringNoValidTarget',{botSuffix})"></span>
            </p>
            <p v-show="victory.isNo(0)">
              <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.utopianInRange',{botSuffix})"></span><br/>
              <BehaviorYesNoButtons :answers="victory" :index="1"/>
            </p>
            <div class="answer" v-show="victory.isAnswered(1)">
              <p v-show="victory.isYes(1)">
                <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.moveToUtopian',{botSuffix})"></span>
              </p>
              <p v-show="victory.isNo(1)">
                <span v-html="t('rules.concepts.behavior.victory.advanceInteractive.switchDefensive',{botSuffix})"></span>
              </p>
            </div>
          </div>
          <ActionRulesCollapse>
            <h6>{{t('rules.action.advance.title',{botSuffix})}}</h6>
            <p v-html="t('rules.concepts.behavior.victory.advance.priorityUtopian',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.victory.advance.scoringFocus',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.victory.advance.scoringTie',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.victory.advance.scoringNoValidTarget',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.victory.advance.switchDefensive',{botSuffix})"></p>
            <h6>{{t('rules.action.recruit.title',{botSuffix})}}</h6>
            <p v-html="t('rules.concepts.behavior.victory.recruit.description',{botSuffix})"></p>
          </ActionRulesCollapse>
        </div>

        <!-- Defensive Behavior -->
        <div class="tab-pane" :id="`tab-behavior-defensive${botSuffix}`" role="tabpanel" :aria-labelledby="`tablink-behavior-defensive${botSuffix}`" tabindex="0">
          <p>
            <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.besiegedColonies',{botSuffix})"></span><br/>
            <BehaviorYesNoButtons :answers="defensive" :index="0"/>
          </p>
          <div class="answer" v-show="defensive.isAnswered(0)">
            <p v-show="defensive.isYes(0)">
              <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.defendClosestColony',{botSuffix})"></span><br/>
              <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.defendNoValidTarget',{botSuffix})"></span>
            </p>
            <p v-show="defensive.isNo(0)">
              <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.enemiesInRange',{botSuffix})"></span><br/>
              <BehaviorYesNoButtons :answers="defensive" :index="1"/>
            </p>
            <div class="answer" v-show="defensive.isAnswered(1)">
              <p v-show="defensive.isYes(1)">
                <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.moveToClosestEnemy',{botSuffix})"></span>
              </p>
              <p v-show="defensive.isNo(1)">
                <span v-html="t('rules.concepts.behavior.defensive.advanceInteractive.switchExpansive',{botSuffix})"></span>
              </p>
            </div>
          </div>
          <ActionRulesCollapse>
            <h6>{{t('rules.action.advance.title',{botSuffix})}}</h6>
            <p v-html="t('rules.concepts.behavior.defensive.advance.priorityReinforce',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.defensive.advance.moveReinforce',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.defensive.advance.opponentSpaceUnits',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.defensive.advance.severalUnits',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.defensive.advance.switchExpansive',{botSuffix})"></p>
            <h6>{{t('rules.action.recruit.title',{botSuffix})}}</h6>
            <p v-html="t('rules.concepts.behavior.defensive.recruit.description',{botSuffix})"></p>
          </ActionRulesCollapse>
        </div>

        <!-- Aggressive Behavior -->
        <div class="tab-pane" :id="`tab-behavior-aggressive${botSuffix}`" role="tabpanel" :aria-labelledby="`tablink-behavior-aggressive${botSuffix}`" tabindex="0">
          <p>
            <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.enemyColoniesInRange',{botSuffix})"></span><br/>
            <BehaviorYesNoButtons :answers="aggressive" :index="0"/>
          </p>
          <div class="answer" v-show="aggressive.isAnswered(0)">
            <p v-show="aggressive.isYes(0)">
              <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.moveToEnemyColony',{botSuffix})"></span><br/>
              <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.aggressiveNoValidTarget',{botSuffix})"></span>
            </p>
            <p v-show="aggressive.isNo(0)">
              <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.enemyUnitsInRange',{botSuffix})"></span><br/>
              <BehaviorYesNoButtons :answers="aggressive" :index="1"/>
            </p>
            <div class="answer" v-show="aggressive.isAnswered(1)">
              <p v-show="aggressive.isYes(1)">
                <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.enforceContestedSectors',{botSuffix})"></span>
              </p>
              <p v-show="aggressive.isNo(1)">
                <span v-html="t('rules.concepts.behavior.aggressive.advanceInteractive.switchExpansive',{botSuffix})"></span>
              </p>
            </div>
          </div>
          <ActionRulesCollapse>
            <h6>{{t('rules.action.advance.title',{botSuffix})}}</h6>
            <p v-html="t('rules.concepts.behavior.aggressive.advance.priorityEnemyColonies',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.aggressive.advance.attackColony',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.aggressive.advance.contestedSector',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.aggressive.advance.prioritize',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.aggressive.advance.switchExpansive',{botSuffix})"></p>
            <h6>{{t('rules.action.recruit.title',{botSuffix})}}</h6>
            <p v-html="t('rules.concepts.behavior.aggressive.recruit.description',{botSuffix})"></p>
          </ActionRulesCollapse>
        </div>

        <!-- Expansive Behavior -->
        <div class="tab-pane" :id="`tab-behavior-expansive${botSuffix}`" role="tabpanel" :aria-labelledby="`tablink-behavior-expansive${botSuffix}`" tabindex="0">
          <p>
            <span v-html="t('rules.concepts.behavior.expansive.advanceInteractive.colonizableSectorInRange',{botSuffix})"></span><br/>
            <BehaviorYesNoButtons :answers="expansive" :index="0"/>
          </p>
          <div class="answer" v-show="expansive.isAnswered(0)">
            <p v-show="expansive.isYes(0)">
              <span v-html="t('rules.concepts.behavior.expansive.advanceInteractive.transportColonizableSector',{botSuffix})"></span>
            </p>
            <p v-show="expansive.isNo(0)">
              <span v-html="t('rules.concepts.behavior.expansive.advanceInteractive.enemySectorInRange',{botSuffix})"></span><br/>
              <BehaviorYesNoButtons :answers="expansive" :index="1"/>
            </p>
            <div class="answer" v-show="expansive.isAnswered(1)">
              <p v-show="expansive.isYes(1)">
                <span v-html="t('rules.concepts.behavior.expansive.advanceInteractive.transportEnemySector',{botSuffix})"></span>
              </p>
              <p v-show="expansive.isNo(1)">
                <span v-html="t('rules.concepts.behavior.expansive.advanceInteractive.utopianOrReinforce',{botSuffix})"></span>
              </p>
            </div>
          </div>
          <ActionRulesCollapse>
            <h6>{{t('rules.action.advance.title',{botSuffix})}}</h6>
            <p v-html="t('rules.concepts.behavior.expansive.advance.priorityExpansion',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.expansive.advance.transportColonizableSector',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.expansive.advance.enemySectorInRange',{botSuffix})"></p>
            <p v-html="t('rules.concepts.behavior.expansive.advance.utopianOrReinforce',{botSuffix})"></p>
            <h6>{{t('rules.action.recruit.title',{botSuffix})}}</h6>
            <p v-html="t('rules.concepts.behavior.expansive.recruit.description',{botSuffix})"></p>
          </ActionRulesCollapse>
        </div>

      </div>
    </template>
    <template #footer>
      <button class="btn btn-secondary" @click="reset()">{{t('action.reset',{botSuffix})}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close',{botSuffix})}}</button>
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
import resolveIconReferences from '@/util/resolveIconReferences'

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
  props: {
    bot: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      victory: new BehaviorAnswers(),
      defensive: new BehaviorAnswers(),
      aggressive: new BehaviorAnswers(),
      expansive: new BehaviorAnswers()
    }
  },
  computed: {
    botSuffix() : string {
      return this.bot ? `-${this.bot}` : ''
    },
    empireTracks() : string[] {
      return [
        'imperial',
        'productive',
        'scientific',
        'military'
      ]
    }
  },
  methods: {
    reset() : void {
      this.victory.reset()
      this.defensive.reset()
      this.aggressive.reset()
      this.expansive.reset()
    },
    resolveIconReferences(text: string) : string {
      return resolveIconReferences(text)
    }
  },
  mounted() {
    enableTabLinksInContent(this.$el as HTMLElement)
  }
})
</script>

<style lang="scss" scoped>
.answer {
  margin-left: 1rem;
}
.answer::before {
  content: '↳';
  float: left;
  margin-right: 0.25rem;
  height: 2rem;
}
table th {
  font-size: small;
}
</style>
