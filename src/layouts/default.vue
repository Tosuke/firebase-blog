<template>
  <div>
    <app-header/>
    <main class="columns is-centered">
      <div class="column is-two-thirds">
        <nuxt/>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '~/components/AppHeader.vue'

export default Vue.extend({
  components: {
    AppHeader,
  },
})
</script>
