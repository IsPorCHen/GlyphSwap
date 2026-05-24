import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import pkg from './package.json';

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
                namespace: 'https://github.com/IsPorCHen/GlyphSwap',
                version: pkg.version,
                author: pkg.author,
                description: pkg.description,
                icon: 'https://cdn-icons-png.flaticon.com/512/3203/3203875.png',
                match: ['*://*/*'],
                grant: ['GM_xmlhttpRequest'],
                connect: ['translate.yandex.net', '*'],
            },
            build: {
                fileName: 'glyphswap.user.js',
            },
        }),
    ],
});