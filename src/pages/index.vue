<template>
  <section class="section">
    <entries-list :entries="entries"/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import EntriesList from '~/components/EntriesList.vue'
import { fetchEntries } from '~/plugins/posts'
import { toArray } from '~/plugins/util'

export default Vue.extend({
  async asyncData() {
    fetchEntries()[Symbol.asyncIterator]
    const entries = await toArray(fetchEntries())
    return {
      entries,
    }
  },
  components: {
    EntriesList,
  },
})
</script>
