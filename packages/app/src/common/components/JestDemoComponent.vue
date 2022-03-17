<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

  props: {
    message: {
      type: String,
      default: '',
    },
  },

  data (){
    return {
      
    }
  },
})
</script>

<template>
  <VContainer>
    <VCard>
      <VCardTitle>
        {{ message }}
      </VCardTitle>
    </VCard>
  </VContainer>
</template>

<style>

</style>