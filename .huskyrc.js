module.exports = {
    hooks: {
        'pre-commit': 'lint-staged --config lint-staged.config.js',
        'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    },
}