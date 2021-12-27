<template>
  <VContainer>
    <HelloWorld />
  </VContainer>
</template>

<script lang="ts">
// vue
import Vue from 'vue'
// components
import HelloWorld from '@/common/components/HelloWorld.vue'

export default Vue.extend({
  name: 'HomePage',

  components: { HelloWorld },
})
</script>

<style>

</style>