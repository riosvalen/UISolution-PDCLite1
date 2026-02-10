import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../pages/LoginPage';
import FichaPage from '../../../pages/FichaPage';
const ficha = new FichaPage();

const envi = Cypress.env('ENV') || 'TST';
const url = Cypress.env(envi).url_ficha_sic;
const url2 = Cypress.env(envi).url_ficha_siro;

Given("el usuario abre una ficha sic", () => {
    cy.visit(`${url}`);
    cy.wait(5000);
});

//Nuevo
Given("el usuario abre una ficha SIRO", () => {
    cy.visit(`${url2}`);
    cy.wait(5000);
});

When("el usuario hace click en contactar alojamiento", () => {
    ficha.contactClick();
});

Then("el sistema muestra el calendario", () => {
    ficha.calendarValidation();
});

When("el usuario selecciona fechas", () => {
    ficha.selectMonth();
    ficha.selectDates();

});

When("el usuario hace click en aplicar", () => {
    ficha.applyDates();
})

When("el alojamiento esta disponible para la consulta", () => {
    ficha.disableBtnContact();
});

Then("el sistema muestra la seccion de consultas", () => {

});

When("el usuario completa nombre, email y telefono", () => {
    ficha.sendName();
    ficha.sendEmail();
    ficha.sendPhone();
});

When('el usuario hace click en el boton de contacto wpp', () => {
    ficha.clickWpp()
});

Then('el sistema intenta abrir la pestaña de wpp', () => {
    cy.get('@windowOpen').should('have.been.called')
});

Then('el sistema muestra un modal de confirmacion de envio', () => {
    ficha.sentSuccessfully()
});

When('el usuario cierra el modal de confirmacion de envio', () => {
    ficha.closeConfirmationModal()
});

Then('el sistema muestra thank you page confirmacion de envio', () => {
    ficha.wppThankYouPage()
});

Then('el usuario hace click en el boton de contacto email', () => {
    ficha.clickEmail()
});

Then('el usuario escribe un mensaje', () => {
    ficha.writeEmail()
});

Then('el usuario hace click en enviar', () => {
    ficha.clickSendEmail()
});

When('el usuario hace click en el boton de contacto llamada', () => {
    ficha.clickCallBtn()
});

Then('el sistema muestra el telefono del partner', () => {
    ficha.callThankiuPage()
});

Then("el sistema muestra las imagenes", () => {
    ficha.galleryAssert()
});

Then("el sistema muestra el icono compartir", () => {
    ficha.shareAssert()
});

Then("el sistema muestra el icono para favoritos", () => {
    ficha.fauvoriteAssert()
});

Then("el sistema muestra el booking sumary", () => {
    ficha.bookingSumaryAssert()
});

Then("el sistema muestra las tipologías disponibles", () => {
    ficha.optionsAssert()
});

Then("el sistema muestra la ubicacion del alojamiento y el link de google maps", () => {
    ficha.locationAssert()
});

Then("el sistema muestra la politica de cancelacion", () => {
    ficha.ratingsAssert()
});

Then("el sistema muestra horario de ingreso y egreso", () => {
    ficha.schedulesAssertion()
});

Then("el sistema muestra politica de garantia", () => {
    ficha.warrantyPolicyAssertion()
});

Then("el sistema muestra formas de pago del alojamiento", () => {
    ficha.paymentMethodsAssertion()
});













