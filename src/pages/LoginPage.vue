<template>
  <q-page class="flex flex-center">
    <div class="column" style="width: 300px">
      <div class="text-h4 q-my-md">Login</div>
      <q-form @submit.prevent="login">
        <q-input v-model="email" label="Email" />
        <q-input
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:append>
            <q-btn
              flat
              round
              dense
              @click="handleToggleViewPassword"
              :icon="showPassword ? 'visibility_off' : 'visibility'"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            ></q-btn>
          </template>
        </q-input>
        <q-btn class="q-mt-md" type="submit" label="Login" />
      </q-form>
      <div class="text-center q-mt-md">
        Forgot your password?
        <a
          role="button"
          @click="forgotPassword"
          class="text-primary cursor-pointer underline"
          >Click here</a
        >
      </div>
      <div class="text-center q-mt-md">
        Don't have an account yet?
        <router-link to="/signup">Sign Up</router-link>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { showErrorDialogFn, showSuccessDialogFn } from '../lib/common'

import { FB_auth } from 'src/boot/firebase'
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      showErrorDialog: false,
      errorMessage: '',
      showPassword: false,
    }
  },
  methods: {
    async login() {
      try {
        // login with email and password firebase
        await signInWithEmailAndPassword(FB_auth, this.email, this.password)

        this.$router.push('/') // Redirect to the home page after successful login
      } catch (err) {
        console.error({ err })
        showErrorDialogFn()
      }
    },

    handleToggleViewPassword() {
      this.showPassword = !this.showPassword
    },

    async forgotPassword() {
      if (!this.email) {
        console.error('Email is required')
        showErrorDialogFn('Email is required')
        return
      }

      try {
        await sendPasswordResetEmail(FB_auth, this.email)

        console.log('Password reset email sent')
        showSuccessDialogFn(
          'Password reset email sent',
          'If your email exists in our database, you will receive a password reset link.'
        )
      } catch (error: Error | any) {
        console.error('Error sending password reset email:', error)
        showErrorDialogFn(
          'Error sending password reset email: ' + error.message
            ? error.message
            : ''
        )
      }
    },
  },
})
</script>
