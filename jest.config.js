module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.vue'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ]
}
