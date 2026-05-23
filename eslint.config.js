const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2023,
            globals: {
                ...globals.browser
            }
        }
    }
];