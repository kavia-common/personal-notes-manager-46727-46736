import { defineNuxtPlugin } from '#app'
import { createPinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  // PUBLIC_INTERFACE
  /** Install Pinia into the Nuxt application.
   * This plugin runs only on the client (suffix .client.ts), ensuring localStorage
   * access in stores remains safe by default.
   */
  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)
})
