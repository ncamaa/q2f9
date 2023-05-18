import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

const FIREBASE_CONFIG_PARSED = JSON.parse(process.env.FIREBASE_CONFIG)

console.log({ FIREBASE_CONFIG_PARSED })

export const FB = initializeApp(FIREBASE_CONFIG_PARSED)
export const FB_auth = getAuth(FB)
export const FB_db = getFirestore(FB)
export const FB_functions = getFunctions(FB)

// Connect to emulators if running locally, and if the config says to
if (FIREBASE_CONFIG_PARSED.use_emulator === 'true') {
  console.log('Using emulators')
  connectAuthEmulator(FB_auth, 'http://localhost:9099')
  connectFirestoreEmulator(FB_db, 'localhost', 8080)
  connectFunctionsEmulator(FB_functions, 'localhost', 5001)
}

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
