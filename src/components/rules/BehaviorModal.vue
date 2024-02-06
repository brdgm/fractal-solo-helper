<template>
  <ModalDialog id="rulesBehaviorModal" :size-xl="true" :scrollable="true"
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
          <p>TBD defensive...</p>
        </div>
        <div class="tab-pane" id="tab-behavior-aggressive" role="tabpanel" aria-labelledby="tablink-behavior-aggressive" tabindex="0">
          <p>TBD aggressive...</p>
        </div>
        <div class="tab-pane" id="tab-behavior-expansive" role="tabpanel" aria-labelledby="tablink-behavior-expansive" tabindex="0">
          <p>TBD expansive...</p>
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'BehaviorModal',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
