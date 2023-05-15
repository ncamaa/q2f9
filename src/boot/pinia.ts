import { createPinia } from 'pinia'
import { App } from 'vue'

export default function ({ app }: { app: App }) {
  app.use(createPinia())
}
