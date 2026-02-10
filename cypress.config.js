const { defineConfig } = require("cypress");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;


module.exports = defineConfig({
  e2e: {
    // 👇 async + await es CLAVE
    async setupNodeEvents(on, config) {
      on = require("cypress-on-fix")(on);
      const allureWriter = require("@shelex/cypress-allure-plugin/writer");
      const fs = require('fs');
      const path = require('path');

      await addCucumberPreprocessorPlugin(on, config);

      allureWriter(on, config);

      // Metadata for Allure Report
      on('after:run', (results) => {
        const allureResultsPath = path.resolve(config.projectRoot, config.env.allureResultsPath || 'allure-results');
        if (!fs.existsSync(allureResultsPath)) {
          fs.mkdirSync(allureResultsPath, { recursive: true });
        }

        // environment.properties
        const envProperties = `
Browser=${results.browserName}
BrowserVersion=${results.browserVersion}
Platform=${results.osName}
PlatformVersion=${results.osVersion}
ENV=${config.env.ENV || 'N/A'}
Viewport=${config.viewportWidth}x${config.viewportHeight}
`.trim();
        fs.writeFileSync(path.join(allureResultsPath, 'environment.properties'), envProperties);

        // executor.json
        const executorJson = {
          name: 'Local Machine',
          type: 'cypress',
          buildName: `Run ${new Date().toLocaleString()}`
        };
        fs.writeFileSync(path.join(allureResultsPath, 'executor.json'), JSON.stringify(executorJson, null, 2));
      });

      // Lógica de resolución dinámica para manejo de dos resoluciones
      const tag = config.env.RUN_TAG || "";
      if (tag.includes("@mobile")) {
        config.viewportWidth = 412;
        config.viewportHeight = 915;
        config.env.isMobile = true;
      } else {
        config.viewportWidth = 1920;
        config.viewportHeight = 1080;
        config.env.isMobile = false;
      }

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
    specPattern: "cypress/journeys/features/e2e/**/*.feature",
    responseTimeout: 20000,
    defaultCommandTimeout: 20000,
    chromeWebSecurity: false,
  },
});



