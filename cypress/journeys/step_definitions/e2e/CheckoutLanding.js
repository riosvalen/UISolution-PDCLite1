import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import Checkout_1Page from '../../../pages/Checkout_1Page';
import Checkout_2Page from '../../../pages/Checkout_2Page';
import Checkout_3Page from '../../../pages/Checkout_3Page';
import LandingPage from '../../../pages/LandingPage';
const checkout_1 = new Checkout_1Page();
const checkout_2 = new Checkout_2Page();
const checkout_3 = new Checkout_3Page();
const landingPage = new LandingPage();
// Obtenemos el entorno actual de Cypress
// Esto nos permite usar diferentes configuraciones según el entorno (TST, STG, etc.)
const envName = Cypress.env('ENV'); // "TST"
const envConfig = Cypress.env(envName);

When("el usuario selecciona fecha inicio y fin de reserva disponible", () => {
    landingPage.seleccionarFechasConDisponibilidad();
});

Then("el usuario selecciona una tipologia disponible", () => {
    landingPage.seleccionarTipologia();
});

Then("el usuario es redirigido a la pagina de checkout 1", () => {
    checkout_1.checkout1Assert();
});

Then("el usuario visualiza los detalles de su estadia en checkout 1", () => {
    checkout_1.detallesEstadiaAssert();
});

Then("el usuario hace clic en 'Continuar' en checkout 1", () => {
    checkout_1.clickContinuar();
});

Then("el usuario es redirigido a la pagina de checkout 2", () => {
    checkout_2.checkout2Assert();
});

Then("el usuario ingresa {string} {string} {string} {string} {string}", (Nombre, Apellido, DNI, Telefono, Email) => {
    checkout_2.ingresarNombre(Nombre);
    checkout_2.ingresarApellido(Apellido);
    checkout_2.ingresarDNI(DNI);
    checkout_2.ingresarTelefono(Telefono);
    checkout_2.ingresarEmail(Email);
});

Then("el usuario hace clic en 'Continuar' en checkout 2", () => {
    checkout_2.clickContinuar();
});

Then("el usuario es redirigido a la pagina de checkout 3 y saluda a {string}", (nombre) => {
    checkout_3.checkout3Assert(nombre);
});

Then("el usuario visualiza los detalles de su estadia en checkout 3", () => {
    checkout_3.detallesEstadiaAssert();
});

Then("el usuario selecciona medio de pago 'Tarjeta de Débito - Crédito'", () => {
    checkout_3.seleccionarMedioPago();
});

Then("el usuario hace clic en 'Solicitar reserva'", () => {
    checkout_3.clickSolicitarReserva();
    cy.wait(6000);
});

Then("el usuario es redirigido a la pantalla Thanks", () => {
    checkout_3.thanksAssert();
});
