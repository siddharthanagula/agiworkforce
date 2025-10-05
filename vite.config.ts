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
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      external: [],
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
          // Auth0 and other React-dependent libraries - keep with React
          if (id.includes('@auth0') || id.includes('zustand') || id.includes('sonner')) {
            return 'react-vendors'
          }
          // ElevenLabs - keep with React to prevent Activity errors
          if (id.includes('@elevenlabs') || id.includes('elevenlabs')) {
            return 'react-vendors'
          }
          // UI Components that depend on React
          if (id.includes('@radix-ui') || id.includes('framer-motion') || id.includes('lucide-react')) {
            return 'ui-components'
          }
          // Spline 3D (separate chunk for heavy 3D library)
          if (id.includes('@splinetool') || id.includes('react-spline')) {
            return 'spline-3d'
          }
          // Spline runtime (separate from react-spline)
          if (id.includes('@splinetool/runtime')) {
            return 'spline-runtime'
          }
          // Default chunk for other dependencies
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // Ensure proper chunk loading order
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'react-vendors') {
            return 'assets/react-vendors-[hash].js'
          }
          return 'assets/[name]-[hash].js'
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
