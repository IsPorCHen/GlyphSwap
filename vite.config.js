import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.js',
            name: 'GlyphSwap',
            formats: ['iife'],
            fileName: () => 'glyphswap.user.js'
        }
    }
})