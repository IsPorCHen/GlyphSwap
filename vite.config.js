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
                homepage: 'https://github.com/IsPorCHen/GlyphSwap',
                supportURL: 'https://github.com/IsPorCHen/GlyphSwap/issues',
                downloadURL: 'https://github.com/IsPorCHen/GlyphSwap/releases/latest/download/glyphswap.user.js',
                updateURL: 'https://github.com/IsPorCHen/GlyphSwap/releases/latest/download/glyphswap.user.js',

                version: pkg.version,
                author: pkg.author,
                description: pkg.description,
                icon: 'https://github.com/IsPorCHen/GlyphSwap/raw/main/assets/logo.png',
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