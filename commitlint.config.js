const configs = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'components', 'sdk']
    ],
    'subject-case': [2, 'always', 'sentence-case']
  }
}
module.exports = configs
