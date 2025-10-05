import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'ES2020',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React dependencies - keep React and React-DOM together
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendors'
          }
          // Router - keep with React dependencies
          if (id.includes('react-router-dom') || id.includes('react-router')) {
            return 'react-vendors'
          }
          // UI Components that depend on React
          if (id.includes('@radix-ui') || id.includes('framer-motion') || id.includes('lucide-react')) {
            return 'ui-components'
          }
          // AI Providers
          if (id.includes('@anthropic-ai') || id.includes('openai') || id.includes('@google/generative-ai')) {
            return 'ai-providers'
          }
          // Spline 3D (separate chunk for heavy 3D library)
          if (id.includes('@splinetool') || id.includes('react-spline')) {
            return 'spline-3d'
          }
          // Spline runtime (separate from react-spline)
          if (id.includes('@splinetool/runtime')) {
            return 'spline-runtime'
          }
          // Physics and 3D math libraries
          if (id.includes('physics') || id.includes('navmesh') || id.includes('boolean') || id.includes('gaussian-splat')) {
            return 'physics-3d'
          }
          // Audio libraries
          if (id.includes('howler')) {
            return 'audio'
          }
          // Font and typography
          if (id.includes('opentype')) {
            return 'fonts'
          }
          // Process utilities
          if (id.includes('process')) {
            return 'utils'
          }
          // Auth0 and other React-dependent libraries
          if (id.includes('@auth0') || id.includes('@tanstack/react-query') || id.includes('zustand') || id.includes('sonner')) {
            return 'react-vendors'
          }
          // Default chunk for other dependencies
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
