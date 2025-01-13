import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/', // Root of your app
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures the output directory matches your folder structure
    emptyOutDir: true, // Clears the output directory before building
  },
  server: {
    port: 3000, // Optional: set the local development server port
  },
})
