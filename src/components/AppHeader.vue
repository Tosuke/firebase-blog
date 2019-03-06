<template>
  <header>
    <section class="hero is-primary is-small is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <nuxt-link to="/">
            <h1 class="title">{{ title }}</h1>
          </nuxt-link>
          <h2 class="subtitle">{{ description }}</h2>
        </div>
      </div>
    </section>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      title: process.env.TITLE,
      description: process.env.DESCRIPTION
    }
  }
})
</script>

