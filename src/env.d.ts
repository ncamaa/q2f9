/* eslint-disable */

import { FirebaseOptions } from 'firebase/app'

// declare an interface which is FirebaseOptions and another property called use_emulator
interface FirebaseOptionsWithEmulator extends FirebaseOptions {
  use_emulator: boolean
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
    FIREBASE_CONFIG: FirebaseOptionsWithEmulator
  }
}
