import App from '@/App.vue'
import { useDarkMode } from '@/composables/useDarkMode'
import router from '@/router'
import { createApp } from 'vue'

import '@/assets/main.css'
import 'vue-sonner/style.css'

const app = createApp(App)

app.use(router)

const { initializeDarkMode, onSystemPreferenceChange } = useDarkMode()

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', onSystemPreferenceChange)

initializeDarkMode()

async function enableMocking() {
  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}

enableMocking().then(() => {
  app.mount('#app')
})
