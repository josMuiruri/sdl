import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from 'globals';

export default [
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**'],
    },
    js.configs.recommended,
    eslintConfigPrettier,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "no-unused-vars": ['warn', { 'argsIgnorePattern': '^_' }],
            "no-console": "off"
        }
    }
];