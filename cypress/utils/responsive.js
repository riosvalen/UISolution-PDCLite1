// Marca global para saber si es mobile
export const isMobile = () => Boolean(Cypress.env('isMobile'));

// Selecciona el locator correcto
export function responsiveGet(selectors) {
  const chosen = isMobile()
    ? (selectors.mobile ?? selectors.desktop)
    : (selectors.desktop ?? selectors.mobile);

  // permite cy.contains() como función
  return typeof chosen === 'function' ? chosen() : cy.get(chosen);
}

