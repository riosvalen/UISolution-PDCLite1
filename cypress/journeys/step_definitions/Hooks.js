import { Before, BeforeAll, AfterAll } from '@badeball/cypress-cucumber-preprocessor';

// ===========================
// Helpers
// ===========================
const setMobile = () => {
  Cypress.env('isMobile', true);
  cy.viewport(412, 915);
};

const setDesktop = () => {
  Cypress.env('isMobile', false);
  cy.viewport(1920, 1080);
};

// ===========================
// 1) Viewport por RUN_TAG
// ===========================
Before(() => {
  const runTag = Cypress.env('RUN_TAG');

  if (runTag === '@mobile') {
    setMobile();
  }

  if (runTag === '@desktop') {
    setDesktop();
  }
});

// ===========================
// 2) Viewport por TAG Cucumber
// ===========================
Before({ tags: '@mobile' }, () => {
  setMobile();
});

Before({ tags: '@desktop' }, () => {
  setDesktop();
});

// ===========================
// 3) Fallback
// ===========================
Before(() => {
  if (Cypress.env('isMobile') === undefined) {
    setDesktop();
  }
});

// ===========================
// 4) Limpieza + visitar
// ===========================
Before(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Before(() => {
  const envKey = Cypress.env('ENV') || 'TST';
  const cfg = Cypress.env(envKey);

  if (!cfg?.url_apollo) {
    cy.log(`⚠️ ENV '${envKey}' sin url_apollo, se omite visit`);
    return;
  }

  cy.visit(cfg.url_apollo);
});
