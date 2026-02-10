import { responsiveGet } from "../utils/responsive";

class Checkout_2Page {
    elements = {
        checkout2Assert: () =>
            responsiveGet({
                desktop: () => cy.contains('Datos del títular'),
                mobile: () => cy.contains('Datos del títular')
            }),

        ingresarNombre: () =>
            responsiveGet({
                desktop: () => cy.get('input[name="nombre"]'),
                mobile: () => cy.get('input[name="nombre"]'),
            }),
        ingresarApellido: () =>
            responsiveGet({
                desktop: () => cy.get('input[name="apellido"]'),
                mobile: () => cy.get('input[name="apellido"]'),
            }),
        ingresarDNI: () =>
            responsiveGet({
                desktop: () => cy.get('input[name="identificacion"]'),
                mobile: () => cy.get('input[name="identificacion"]'),
            }),
        ingresarTelefono: () => responsiveGet({
            desktop: () => cy.get('input[name="telefono"]'),
            mobile: () => cy.get('input[name="telefono"]'),
        }),
        ingresarEmail: () => responsiveGet({
            desktop: () => cy.get('input[name="email"]'),
            mobile: () => cy.get('input[name="email"]'),
        }),
        clickContinuar: () =>
            responsiveGet({
                desktop: () => cy.contains('button', 'Continuar'),
                mobile: () => cy.contains('button', 'Continuar')
            }),
    }

    checkout2Assert() {
        this.elements.checkout2Assert().should('be.visible');
    }

    ingresarNombre(nombre) {
        this.elements.ingresarNombre().should('be.visible').type(nombre);
    }

    ingresarApellido(apellido) {
        this.elements.ingresarApellido().should('be.visible').type(apellido);
    }

    ingresarDNI(dni) {
        this.elements.ingresarDNI().should('be.visible').type(dni);
    }

    ingresarTelefono(telefono) {
        this.elements.ingresarTelefono().should('be.visible').type(telefono);
    }

    ingresarEmail(email) {
        this.elements.ingresarEmail().should('be.visible').type(email);
    }

    clickContinuar() {
        this.elements.clickContinuar().should('be.visible').and('not.be.disabled').click();
    }

}

export default Checkout_2Page;