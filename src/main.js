// ==UserScript==
// @name         GlyphSwap
// @namespace    https://github.com/IsPorCHen/GlyphSwap
// @version      0.1.0
// @description  Translate image text in browser
// @match        *://*/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

import { recognize } from './core/ocr'
//console.log('GlyphSwap loaded')