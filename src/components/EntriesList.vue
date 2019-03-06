<template>
  <div>
    <template v-for="entry in entries">
      <entry class="post-border" :key="entry.id" :entry="entry"/>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Entry from '~/components/Entry.vue'
export default Vue.extend({
  components: {
    Entry,
  },
  props: ['entries'],
})
</script>

<style scoped >
.post-border >>> {
  border-bottom: solid 0.1rem grey
}
</style>

