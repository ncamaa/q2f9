<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> 💫 Quasar v2 + 🔥 Firebase v9 </q-toolbar-title>

        <div>
          <!-- Logout button -->
          <q-btn
            v-if="user"
            flat
            dense
            round
            icon="logout"
            aria-label="Logout"
            @click="logout"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

// import users store
import { useUserStore } from 'src/stores'

import { FB_auth } from 'src/boot/firebase'

const linksList = [
  {
    title: 'Home',
    caption: 'Sweet home',
    icon: 'home',
    routeName: 'Home',
  },
  {
    title: 'Login',
    caption: 'Login to your account',
    icon: 'login',
    routeName: 'LoginPage',
  },
  {
    title: 'Sign Up',
    caption: 'Create a user',
    icon: 'person_add',
    routeName: 'SignUp',
  },
  {
    title: 'Test',
    caption: 'Test page',
    icon: 'science',
    routeName: 'TestPage',
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false)

    // get user store from pinia
    const userStore = useUserStore()
    const user = computed(() => userStore.auth.user)

    const logout = async () => {
      // logout with firebase auth
      await FB_auth.signOut()
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      user,
      logout,
    }
  },
  methods: {},
})
</script>
