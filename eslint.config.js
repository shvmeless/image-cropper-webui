// IMPORTS
import globals from 'globals'
import javascript from '@eslint/js'
import typescript from 'typescript-eslint'
import love from 'eslint-config-love'
import stylistic from '@stylistic/eslint-plugin'
import react from 'eslint-plugin-react'

// CONFIG
export default typescript.config(
  { ignores: ['dist'] },
  {
    extends: [
      javascript.configs.recommended,
      ...typescript.configs.recommended,
      {...love},
      stylistic.configs['recommended-flat'],
      react.configs.flat.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',

      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-unary-minus': 'error',

      '@stylistic/padded-blocks': 'off',
      '@stylistic/space-before-function-paren': ['error', 'always'],
      '@stylistic/arrow-parens': ['error', 'always'],

      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/jsx-first-prop-new-line': 'off',
      '@stylistic/jsx-closing-tag-location': ['error', 'line-aligned'],
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/jsx-curly-brace-presence': ['error', { 'props': 'never', 'children': 'always', 'propElementValues': 'always' }],
      '@stylistic/jsx-indent': ['error', 2],
      '@stylistic/jsx-indent-props': ['error', 2],
      '@stylistic/jsx-props-no-multi-spaces': 'error',
      '@stylistic/jsx-self-closing-comp': ['error', { 'component': true, 'html': true }],
      '@stylistic/jsx-tag-spacing': ['error', { 'closingSlash': 'never', 'beforeSelfClosing': 'never', 'afterOpening': 'never', 'beforeClosing': 'never' }],
      '@stylistic/jsx-wrap-multilines': ['error', {
        "declaration": "parens",
        "assignment": "parens",
        "return": "ignore",
        "arrow": "parens",
        "condition": "parens",
        "logical": "parens",
        "prop": "parens",
        "propertyValue": "parens",
      }],
      'react/react-in-jsx-scope': 'off',
    }
  },
)
