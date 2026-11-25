import tseslint from 'typescript-eslint';

export default [
  { ignores: ['**/dist/**', '**/coverage/**'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,cjs,mjs,ts,tsx}'],
    rules: {
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'arrow-parens': ['error', 'as-needed']
    }
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      'comma-dangle': 'off',
      'object-curly-spacing': 'off'
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'computed-property-spacing': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'prefer-const': 'warn'
    }
  }
];
