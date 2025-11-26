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

  // Nitro server settings affect preview and SSR dev server bindings.
  // Bind to 0.0.0.0 and respect port from env if provided.
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
    // Expose a simple health endpoint useful for preview infra
    devProxy: {},
    // Ensure nitro listens on the same host/port as vite/nuxt when previewing
    // Nuxt 3.16+ uses NITRO_* envs or defaults; we mirror via runtimeConfig below
  },

  // Ensure dev server binds correctly in containers/preview infra.
  // Prefer env-provided port; relax strictPort to allow fallback if 3000 is taken.
  devServer: {
    host: process.env.NUXT_PUBLIC_HOST || '0.0.0.0',
    port: Number(process.env.NUXT_PUBLIC_PORT || process.env.PORT || 3000),
  },

  // Provide runtime config exposure for host/port which some platforms read.
  runtimeConfig: {
    // server-only
    host: process.env.NUXT_PUBLIC_HOST || '0.0.0.0',
    port: Number(process.env.NUXT_PUBLIC_PORT || process.env.PORT || 3000),
    public: {
      host: process.env.NUXT_PUBLIC_HOST || '0.0.0.0',
      port: Number(process.env.NUXT_PUBLIC_PORT || process.env.PORT || 3000),
      frontendUrl: process.env.NUXT_PUBLIC_FRONTEND_URL || '',
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || '',
    }
  },

  vite: {
    server: {
      host: process.env.NUXT_PUBLIC_HOST || '0.0.0.0',
      allowedHosts: true,
      port: Number(process.env.NUXT_PUBLIC_PORT || process.env.PORT || 3000),
      // Allow using next available port to avoid connection failures
      strictPort: false,
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
