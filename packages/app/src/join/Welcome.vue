<script lang="ts">
// vue
import Vue from 'vue'
import type { Location } from 'vue-router'

export default Vue.extend({
  name: 'WelcomePage',

  mounted () {
    setTimeout(() => {
      let redirect = this.$route.query.redirect
      let redirectLocationObj: Location = { name: 'home' }       
      if (redirect && !Array.isArray(redirect)) {
        try {
          redirectLocationObj = JSON.parse(redirect)
        } catch (error) {
          // ignored
        }
      }

      // console.log('welcome redirects to', redirectLocationObj)
      this.$router.replace(redirectLocationObj)
    }, 1350)
  },
})
</script>

<template>
  <VApp>
    <VMain>
      <VContainer
        fluid
        class="fill-height d-flex justify-center align-items-center"
      >
        <VProgressLinear
          fixed
          indeterminate
          top
        />
        <VRow
          class="fill-height"
          justify="center"
          align="center"
          align-content="center"
        >
          <VCol 
            cols="12"
          >
            <section
              class="d-flex flex-column align-center justify-center pa-4"
            >
              <VImg
                class="mb-4"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
              />

              <VLazy
                transition="fade-transition"
              >
                <h1
                  class="title font-weight-light"
                >
                  Welcome
                </h1>
              </VLazy>
            </section>
          </VCol>
        </VRow>
      </VContainer>
    </VMain>
  </VApp>
</template>