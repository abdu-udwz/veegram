<template>
  <RouterView />
</template>

<script lang="ts">
// vue
import Vue from 'vue'
// stores
import { mapStores } from 'pinia'
import { useStore } from '@/common/stores'

export default Vue.extend({
  name: 'App',

  computed: {
    ...mapStores(useStore),
  },
})
</script>

<style>
</style>
