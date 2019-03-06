<template>
  <div>
    <header class="post-header">
      <h4 class="has-text-weight-light has-text-black">{{ post.createdAt | toISODateString }}</h4>
      <h1 class="has-text-weight-bold has-text-black has-text-centered is-size-4">{{ post.title }}</h1>
    </header>
    <article>
      <p class="content" v-html="post.html"/>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Post } from '~/plugins/posts'
import { toISODateString } from '~/plugins/filters'

type Prop<T> = () => T

export default Vue.extend({
  props: {
    post: Object as Prop<Post>,
  },
  filters: {
    toISODateString,
  },
})
</script>

<style scoped>
.post-header {
  margin-bottom: 1rem;
}
</style>

