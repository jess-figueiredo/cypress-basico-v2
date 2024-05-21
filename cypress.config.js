const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
  scripts: {
    "cy:open": "cypress open --config-file=cypress.config.js",
    "cy:open:mobile": "cypress open --config-file=cypress.config.js --config viewportWidth=410 viewportHeight=860",
    "test": "cypress run --config-file=cypress.config.js",
    "test:mobile": "cypress run --config-file=cypress.config.js --config viewportWidth=410 viewportHeight=860"
  }

})

