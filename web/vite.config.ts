import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Injects gtag.js snippet when VITE_PUBLIC_GA4_ID is set; enables Google tag verification
function ga4GtagPlugin(mode: string) {
  const env = loadEnv(mode, process.cwd(), '')
  const ga4Id = env.VITE_PUBLIC_GA4_ID?.trim()
  if (!ga4Id) return { name: 'vite:ga4-gtag', transformIndexHtml: (html: string) => html }

  const snippet = `
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      <\/script>
      <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"><\/script>
      <script>
        gtag('js', new Date());
        gtag('config', '${ga4Id}');
      <\/script>`

  return {
    name: 'vite:ga4-gtag',
    transformIndexHtml(html: string) {
      return html.replace('<!-- GA4_GTAG_SNIPPET -->', snippet)
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    ga4GtagPlugin(mode),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router'],
          motion: ['motion/react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}))
