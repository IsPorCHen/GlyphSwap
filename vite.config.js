import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
    build: {
        outDir: 'dist',
        minify: false,
    },
    plugins: [
        monkey({
            entry: 'src/main.js',
            userscript: {
                name: 'GlyphSwap',
                namespace: 'http://tampermonkey.net/',
                version: '0.1.0',
                description: 'Translates images in browser via context menu',
                match: ['*://*/*'],
                grant: ['GM_xmlhttpRequest'],
                connect: ['translate.yandex.net'],
            },
            build: {
                fileName: 'glyphswap.user.js',
            },
        }),
    ],
});