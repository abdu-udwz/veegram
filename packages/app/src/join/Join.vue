<template>
  <VContainer style="max-width: 520px">
    <VRow
      class="fill-height"
      justify="center"
      align="center"
      align-content="center"
    >
      <!--    welcoming      -->
      <VCol cols="12">
        <section
          class="d-flex flex-column justify-center align-center"
        >
          <h2>Welcome to VeeGram</h2>
          <p>To continue, please sign-in into your account.</p>
        </section>
      </VCol>

      <!--    sign in/up forms    -->
      <VCol cols="12">
        <VCard
          flat
          class="transparent"
          :loading="submitting"
          :disabled="submitting"
        >
          <VCardTitle
            tag="h2"
            class="pb-0 title font-weight-regular justify-space-between"
          >
            <span>{{ currentTitle }}</span>
          </VCardTitle>

          <VAlert
            v-if="errorMessages.length > 0"
            type="error"
          >
            <ul>
              <li
                v-for="(message, index) of errorMessages"
                :key="index"
              >
                {{ message }}
              </li>
            </ul>
          </VAlert>

          <VWindow
            v-model="step"
          >
            <!--       sign in        -->
            <VWindowItem value="SIGN_IN">
              <VForm 
                ref="signInForm"
                @submit.prevent="localSignIn"
              >
                <VCardText>
                  <VTextField
                    v-model="form.username"
                    label="Username"
                  />

                  <VTextField
                    v-model="form.password"
                    label="Password"
                    :type="form.showPassword? 'text': 'password'"
                    :append-icon="form.showPassword? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="form.showPassword = !form.showPassword"
                  />

                  <VBtn
                    color="primary"
                    block
                    depressed
                    type="submit"
                  >
                    Sign-In
                  </VBtn>

                  <VDivider class="my-3" />
                  <div class="d-flex align-center">
                    <span class="grey--text">Don't have an account?</span>
                    <VBtn
                      class="ms-1"
                      depressed
                      color="grey darken-2"
                      small
                      type="button"
                      @click="step = 'SIGN_UP'"
                    >
                      Create account
                    </VBtn>
                  </div>
                </VCardText>
              </VForm>
            </VWindowItem>

            <!--       sign up           -->
            <VWindowItem value="SIGN_UP">
              <VForm 
                ref="signUpForm"
                @submit.prevent="localSignUp"
              >
                <VCardText>
                  <VTextField
                    v-model="form.username"
                    label="Username"
                    hint="You will use your username to sign in into your account."
                    validate-on-blur
                    persistent-hint
                    :rules="[rules.username]"
                  />

                  <VTextField
                    v-model="form.name"
                    label="Name"
                    validate-on-blur
                    :rules="[rules.name]"
                  />

                  <VTextField
                    v-model="form.password"
                    label="Password"
                    validate-on-blur
                    :rules="[rules.password]"
                    :type="form.showPassword? 'text': 'password'"
                    :append-icon="form.showPassword? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="form.showPassword = !form.showPassword"
                  />

                  <VBtn
                    block
                    depressed
                    color="primary"
                    type="submit"
                  >
                    Create Account
                  </VBtn>

                  <VDivider class="my-3" />
                  <div class="d-flex align-center">
                    <span class="grey--text">Already have an account?</span>
                    <VBtn
                      small
                      depressed
                      color="grey darken-2"
                      class="ms-1"
                      type="button"
                      @click="step='SIGN_IN'"
                    >
                      Sign-in
                    </VBtn>
                  </div>
                </VCardText>
              </VForm>
            </VWindowItem>
          </VWindow>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts">
// vue
import Vue from 'vue'
import {
  localSignUp as sendLocalSignUpReq,
  localSignIn as sendLocalSignInReq,
} from './api'
// util
import axios from 'axios'

type JoinWindowStep = 'SIGN_IN' | 'SIGN_UP'

export default Vue.extend({
  name: 'JoinPage',

  // mixins: [view, validation],

  data () {
    return {
      appBar: false,
      bottomNavigation: false,

      step: 'SIGN_IN' as JoinWindowStep,

      internalErrors: [] as any[],

      language: 'en',

      form: {
        username: '',
        password: '',
        showPassword: false,
        // sign up only
        name: '',
      },

      submitting: false,

      rules: {
        // there are some additional rules that are from 'validation' mixin.
        name (val: null | string): string | boolean {
          let realVal = val?.trim() ?? ''
          if (realVal.length < 2 || realVal.length > 35)
            return 'Must be 2-35 characters.'

          // SO => https://stackoverflow.com/questions/32311081/check-for-special-characters-in-string
          // check for special characters in name.
          let specialChars = /[!@#$%^&*_+\-=[\]{};':.,()"\\|<>/?]/
          if (specialChars.test(realVal))
            return 'Special characters are not allowed'

          return true
        },

        username (val?: null | string): boolean | string {
          let realVal = val?.trim() ?? ''
          if (realVal.length < 3 || realVal.length > 30)
            return 'Must be 3-30 characters.'

          if (/\s/g.test(realVal))
            return 'Spaces aren\'t allowed.'

          let specialChars = /[^_.a-z0-9]/
          if (specialChars.test(realVal))
            return 'Only Latin characters, Numbers, underscores and periods.'

          return true
        },

        password (val: string): boolean | string {
          let passwordRegex = /[^!@#$%^&*_ \-=."\\|?a-zA-Z0-9]/
          if (val.length < 8 || val.length > 32)
            return 'Must be 8-32 characters.'

          return passwordRegex.test(val) ? 'Contains invalid characters.' : true
        },
      },
    }
  },

  computed: {
    currentTitle () {
      switch (this.step) {
        case 'SIGN_IN':
          return 'Sign-In'
        case 'SIGN_UP':
          return 'Create account'
        default:
          return 'UNKNOWN_ERROR'
      }
    },

    errorMessages (): string [] {
      return this.internalErrors.map(error => {
        switch (error) {
          case 'INVALID_NAME':
          case 'INVALID_USERNAME':
            return 'Name or username is not accepted'
          case 'USERNAME_ALREADY_EXIST':
            return 'Username is already used'
          case 'INVALID_PASSWORD':
            return 'Password is to weak or contains characters that are not allowed'
          case 'INCORRECT_CREDENTIALS':
            return 'Username and/or password are incorrect'
          default:
            return 'An unknown error'
        }
      })
    },
  },

  methods: {
    async localSignUp () {
      this.internalErrors = []

      if (this.$refs.signUpForm != null) {
        if (! (this.$refs.signUpForm as any).validate()) {
          return
        }
      }

      try {
        this.submitting = true
        await sendLocalSignUpReq({
          name: this.form.name,
          username: this.form.username,
          password: this.form.password,
        })
        await this.onFinished()
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          this.internalErrors = error.response?.data ?? []
        } else {
          console.error('an unknown error during sign up', error)
        }
      } finally {
        this.submitting = false
      }
    },

    async localSignIn () {
      const { username, password } = this.form

      if (username && password) {
        this.internalErrors = []
        try {
          // do api request and update app state
          this.submitting = true
          await sendLocalSignInReq({
            username,
            password,
          })

          await this.onFinished()
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            // console.log(error.response?.data, error.response?.status)
            this.internalErrors = [error.response?.data]
          } else {
            console.error('something went wrong while signing in ', error)
          }
        } finally {
          this.submitting = false
        }
      }
    },

    async onFinished () {
      let redirect = this.$route.query.redirect

      await this.$router.push({
        name: 'welcome',
        query: {
          redirect,
        },
      })
    },
  },
})
</script>

<style scoped>

</style>