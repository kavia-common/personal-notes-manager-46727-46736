import { defineNuxtPlugin } from '#app'
import { createPinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  // PUBLIC_INTERFACE
  /** Install Pinia into the Nuxt application. */
  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)
})
