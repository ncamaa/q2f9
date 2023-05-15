import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG)

export const FB = initializeApp(firebaseConfig)

export const FB_auth = getAuth(FB)
export const FB_db = getFirestore(FB)
export const FB_functions = getFunctions(FB)

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router, store }) => {
  console.log({ store })
  // on auth state change, redirect to login
  FB_auth.onAuthStateChanged((user) => {
    console.log('Auth state changed')
    if (user) return
    console.log('User is logged out')
    router.push({ name: 'LoginPage' })
  })
})

// })
