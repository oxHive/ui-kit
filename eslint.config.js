import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  {
    ignores: ['dist/**', 'playground/dist/**'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Component names like Button, Badge, Modal, Toast are intentional
      // single-word names throughout this UI kit.
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.vitest,
      },
    },
  },
  eslintConfigPrettier,
]
