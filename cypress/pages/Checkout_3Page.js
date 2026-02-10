import { responsiveGet } from "../utils/responsive";

class Checkout_3Page {
    elements = {
        checkout3Assert: () =>
            responsiveGet({
                desktop: () => cy.get('[data-testid="almostDone"]'),
                mobile: () => cy.get('[data-testid="almostDone"]')
            }),
        detallesEstadiaAssert: () =>
            responsiveGet({
                desktop: () => cy.contains('h6', 'Detalle del precio'),
                mobile: () => cy.get('[data-testid="payment"]').contains('Medios de pago')

            }),
        seleccionarMedioPago: () =>
            responsiveGet({
                desktop: () => cy.contains('label', "Tarjeta de Débito \/ Crédito"),
                mobile: () => cy.contains('label', "Tarjeta de Débito \/ Crédito")
            }),
        clickSolicitarReserva: () =>
            responsiveGet({
                desktop: () => cy.contains('button', 'Solicitar reserva'),
                mobile: () => cy.contains('button', 'Solicitar reserva')
            }),
        thanksAssert: () =>
            responsiveGet({
                desktop: () => cy.get('button[aria-label="Ver mi reserva"]'),
                mobile: () => cy.get('button[aria-label="Ver mi reserva"]')
            }),
    }

    checkout3Assert(nombre) {
        this.elements.checkout3Assert().should('be.visible').and('contain.text', nombre);
    }

    detallesEstadiaAssert() {
        this.elements.detallesEstadiaAssert().should('be.visible');
    }

    seleccionarMedioPago() {
        this.elements.seleccionarMedioPago().should('be.visible').click();
    }

    clickSolicitarReserva() {
        this.elements.clickSolicitarReserva().should('be.visible').and('not.be.disabled').click();
    }

    thanksAssert() {
        this.elements.thanksAssert().should('be.visible');
    }
}

export default Checkout_3Page;
