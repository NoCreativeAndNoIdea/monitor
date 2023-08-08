/**
 * @type {import(eslint).Linter.Config}
 */
const configs = {
  root: true,
  extends: ['@ideaair/eslint-config-ts', '@ideaair/eslint-config-react', 'prettier'],
  plugins: ['prettier'],
  settings: {
    react: {
      version: '18.2.18'
    }
  },
  overrides: [
    {
      files: ['./apps/service/**/*.ts'],
      rules: {
        'new-cap': 'off',
        'require-await': 'off',
        '@typescript-eslint/consistent-type-imports': 'off'
      }
    }
  ],
  rules: {
    'prettier/prettier': 'error',
    complexity: ['error', 5],
    'no-duplicate-imports': 'off',
    'max-lines-per-function': ['error', 50]
  }
}
module.exports = configs
