<template>
  <VApp>
    <VAppBar />

    <VMain class="app--content">
      <RouterView />
    </VMain>
  </VApp>
</template>

<script lang="ts">
// vue
import Vue from 'vue'

export default Vue.extend({
  name: 'MainLayout',
})
</script>

<style>

</style>