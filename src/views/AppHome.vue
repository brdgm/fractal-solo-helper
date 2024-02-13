<template>

  <div class="float-end m-2 w-25">
    <a href="https://boardgamegeek.com/boardgame/299106/fractal" target="_blank" rel="noopener">
      <img src="../assets/game-fractal.webp" class="rounded shadow w-75 mb-3" alt=""/>
    </a>
  </div>

  <h1>{{t('home.title')}}</h1>

  <p v-html="t('home.play1')"></p>
  <p v-html="t('home.play2')"></p>

<!--
  <p class="text-muted fst-italic">
    {{t('home.feedback')}}
    <a href="https://boardgamegeek.com/thread/XXX/brdgmme-fractal-solo-helper-web-application" target="_blank" rel="noopener">Board Game Geek Thread</a> |
    <a href="https://github.com/brdgm/fractal-solo-helper" target="_blank" rel="noopener">GitHub</a>
  </p>
-->

  <router-link to="/setupGame" class="btn btn-primary btn-lg mt-3">{{t('action.playGame')}}</router-link>

  <p class="disclaimer">
    This is not an official Bored Game Ink product and has no affiliation with <a href="https://boredgameink.com/" target="_blank" rel="noopener">Bored Game Ink</a>.
    All art in this app is from <a href="https://boredgameink.com/portfolio/fractal-beyond-the-void/" target="_blank" rel="noopener">Fractal</a>.
    See <a href="#" data-bs-toggle="modal" data-bs-target="#creditsModal">{{t('footer.credits')}}</a>.
    <a href="https://ko-fi.com/brdgm_me" target="_blank" rel="noopener"><img class="kofi-button" src="@/assets/kofi_button_dark.png" alt="Support me on Ko-fi"/></a>
  </p>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppHome',
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>

<style lang="scss" scoped>
.disclaimer {
  clear: both;
  margin-top: 4rem;
  font-size: smaller;
}
.kofi-button {
  height: 1.4rem;
}
</style>
