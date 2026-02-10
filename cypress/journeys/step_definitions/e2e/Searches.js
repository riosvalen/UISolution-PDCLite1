import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../../pages/HomePage';
import LoginPage from '../../../pages/LoginPage';
import ListingPage from '../../../pages/ListingPage';
const home = new HomePage();
const login = new LoginPage();
const normalize = (s) =>
  (s || '').toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
const toSlug = (s) => normalize(s).replace(/\s+/g, '-');

When("el usuario ingresa el destino {string} en el buscador", (destino) => {
  home.sendDestination(destino)
})

When("el usuario hace click en el primer item de la cascada", () => {
  home.selectLocality()
})

When("el usuario cierra el calendario", () => {
  home.closeCalendar()
})

When("el usuario hace click en buscar", () => {
  home.clickSearch()
})

Then(/^el sistema muestra resultados de alojamiento en "([^"]+)"$/, (destino) => {
  const slug = toSlug(destino);
  cy.log(`🎯 Then: esperando que la URL incluya "${slug}"`);

  cy.location('pathname', { timeout: 60000 }).should((pathname) => {
    const normalized = normalize(decodeURIComponent(pathname));
    expect(normalized, `pathname=${normalized}`).to.include(slug);
  });
});