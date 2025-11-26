export default defineNuxtConfig({
  // App metadata for good defaults
  app: {
    head: {
      title: 'Personal Notes - Ocean Professional',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A simple personal notes app with local storage.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2216%22 fill=%22%232563EB%22/><text x=%2250%25%22 y=%2258%25%22 text-anchor=%22middle%22 font-size=%2270%22>🗒️</text></svg>' }
      ]
    }
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  // Use default Nuxt/Vite aliases (@ -> <root>) instead of absolute paths
  // Ensure dev server binds to expected host/port for preview infra
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
      strictPort: true,
    },
    optimizeDeps: {
      include: ['pinia']
    },
    test: {
      environment: 'jsdom',
      globals: true
    }
  },
})
