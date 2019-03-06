<template>
  <div>
    <nuxt-link :to="path">
      <h4 class="has-text-weight-light has-text-black">{{ entry.createdAt | toISODateString }}</h4>
      <h1 class="has-text-weight-bold has-text-black is-size-4">{{ entry.title }}</h1>
      <p class="has-text-grey">{{ entry.description }}</p>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PostEntry } from '~/plugins/posts'
import { toISODateString } from '~/plugins/filters'

type Prop<T> = () => T

export default Vue.extend({
  props: {
    entry: Object as Prop<PostEntry>,
  },
  filters: {
    toISODateString,
  },
  computed: {
    path(): string {
      return `/posts/${this.entry.slug}`
    },
  },
})
</script>

