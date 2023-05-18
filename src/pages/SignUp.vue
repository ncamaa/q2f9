<template>
  <q-page class="flex flex-center">
    <div class="column" style="width: 300px">
      <div class="text-h4 q-my-md">Sign Up</div>
      <div v-if="isLoggedIn">
        You are already logged in.
        <router-link to="/">Go to home page</router-link> or
        <a
          role="button"
          class="text-primary underline cursor-pointer"
          @click="logout"
          >logout</a
        >
      </div>
      <div v-else>
        <q-form @submit.prevent="register">
          <q-input v-model="email" label="Email" :disable="loading" />
          <q-input
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :disable="loading"
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
          <q-btn
            type="submit"
            label="Sign Up"
            class="q-mt-md"
            :loading="loading"
          />
        </q-form>
        <!-- If already has user, link to login -->
        <div class="text-center q-my-md">
          Already have an account? <router-link to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showErrorDialogFn } from '../lib/common'
// import auth
import { FB_auth } from 'src/boot/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { useUserStore } from 'src/stores'

const userStore = useUserStore()

export default defineComponent({
  data() {
    return {
      showPassword: false,
      email: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    async logout() {
      {
        // logout with firebase auth
        await FB_auth.signOut()
      }
    },
    async register() {
      try {
        // register with email and password with Firebase
        this.loading = true
        const userCredential = await createUserWithEmailAndPassword(
          FB_auth,
          this.email,
          this.password
        )
        const user = userCredential.user

        // set user in pinia user store
        userStore.auth.user = user

        this.$router.push({ name: 'Home' })
      } catch (error: unknown) {
        if (!(error instanceof Error)) error = { message: 'Unknown error' }

        console.error('Error during registration:', error)
        showErrorDialogFn('Error during registration: ' + error.message)
      }
    },
    handleToggleViewPassword() {
      this.showPassword = !this.showPassword
    },
  },
  computed: {
    // check if the user is logged in
    isLoggedIn() {
      return userStore.auth?.user || false
    },
  },
})
</script>
