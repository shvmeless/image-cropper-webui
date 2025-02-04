// IMPORTS
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'

// CONFIG
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lib': join(__dirname, './src/lib'),
      '@hooks': join(__dirname, './src/hooks'),
      '@contexts': join(__dirname, './src/contexts'),
      '@screens': join(__dirname, './src/components/screens'),
      '@ui': join(__dirname, './src/components/ui'),
      '@workbench': join(__dirname, './src/components/workbench'),
      '@components': join(__dirname, './src/components'),
    },
  },
})
