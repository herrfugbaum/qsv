module.exports = function(config) {
  config.set({
    mutator: 'javascript',
    packageManager: 'yarn',
    reporters: ['html', 'baseline', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    transpilers: [],
    coverageAnalysis: 'off',
    mutate: ['src/**/*.js'],
  })
}
