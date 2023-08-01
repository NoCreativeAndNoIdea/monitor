/**
 * @type {import(eslint).Linter.Config}
 */
const configs = {
  root: true,
  extends: ['@ideaair/eslint-config-ts', '@ideaair/eslint-config-react', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    complexity: ['error', 5],
    'no-duplicate-imports': 'off'
  }
}
module.exports = configs
