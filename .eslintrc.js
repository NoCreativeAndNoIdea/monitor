/**
 * @type {import(eslint).Linter.Config}
 */
const configs = {
  root: true,
  extends: ['@ideaair/eslint-config-ts', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
module.exports = configs
