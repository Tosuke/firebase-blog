<template>
  <section class="section">
    <post :post="post"/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Post from '~/components/Post.vue'
import { fetchPost } from '~/plugins/posts'

export default Vue.extend({
  async asyncData({ params, ...ctx }) {
    const slug = params.slug as string
    const post = await fetchPost(slug)
    if (post == null) {
      ctx.error({ statusCode: 404 })
    }
    return {
      post
    }
  },
  components: {
    Post
  }
})
</script>

