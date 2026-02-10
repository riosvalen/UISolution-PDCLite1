import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LandingPage from '../../../pages/LandingPage';


const landingPage = new LandingPage();


// Obtenemos el entorno actual de Cypress
// Esto nos permite usar diferentes configuraciones según el entorno (TST, STG, etc.)
const envName = Cypress.env('ENV'); // "TST"
const envConfig = Cypress.env(envName);

const url = envConfig.url_landingPersonalizada_SIRO;
//transformar variable a alias
//cy.wrap(usuario).as("nombreUsuario")
//cy.wrap(contraseña).as("contraseñaUsuario")

Given("el usuario abre la url_landingPersonalizada_SIRO", () => {
    cy.visit(`${url}`),
        cy.wait(5000);
});

Then("el sistema muestra el boton 'Reservar ahora'", function () {
    landingPage.btnReservarAhoraAssert();
});

Then("el sistema muestra descripcion del alojamiento", function () {
    landingPage.descripcionAssert();
});

Then("el sistema muestra los servicios que ofrece", function () {
    landingPage.serviciosAssert();
});

Then("el sistema muestra opciones disponibles", function () {
    landingPage.opcionesDisponiblesAssert();
});

Then("el sistema muestra las valoraciones", function () {
    landingPage.valoracionesAssert();
});

Then("el sistema muestra las reseñas", function () {
    landingPage.reseñasAssert();
});

Then("el sistema muestra la ubicacion del alojamiento", function () {
    landingPage.ubicacionAssert();
});

Then("el sistema muestra las condiciones de la reserva", function () {
    landingPage.condicionesReservaAssert();
});

Then("el sistema muestra politica de la reserva", function () {
    landingPage.politicaCancelacionAssert();
});

Then("el sistema muestra las normas del alojamiento", function () {
    landingPage.normasAlojamientoAssert();
});

Then("el sistema muestra el horario de ingreso y egreso", function () {
    landingPage.horarioIngEgresoAssert();
});

Then("el sistema muestra la politica de garantia", function () {
    landingPage.politicaGarantiaAssert();
});

Then("el sistema muestra las formas de pago", function () {
    landingPage.formasPagoAssert();
});

Then("el sistema muestra el footer de la landing", function () {
    landingPage.footerAssert();
});


When("el usuario selecciona fecha inicio y fin de reserva disponibles", function () {
    // Selecciona check-in en 2 días y una estadía de 7 días
    landingPage.seleccionarFechas(2, 5);
});

Then("el sistema muestra el boton Reservar", function () {
    landingPage.btnReservarAssert();
});

When("el usuario hace clic en Reservar", function () {
    landingPage.clickReservar();
});

