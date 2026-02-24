import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.png', '**/*.jpeg', '**/*.jpg', '**/*.gif', '**/*.svg', '**/*.webp'],
    server: {
        hmr: { overlay: true },
        watch: { usePolling: false },
    },
})
