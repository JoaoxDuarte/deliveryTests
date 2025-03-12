import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    supportFile: 'cypress/support/commands.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://app-hom.cocobambu.com/delivery',
    testIsolation: false
  },
});
