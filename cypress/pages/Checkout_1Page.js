import { responsiveGet } from "../utils/responsive";

class Checkout_1Page {
    elements = {
        checkout1Assert: () =>
            responsiveGet({
                desktop: () => cy.get('div.MuiBox-root div').eq(0),
                mobile: () => cy.get('div.MuiGrid-item').eq(0)
            }),
        detallesEstadiaAssert: () =>
            responsiveGet({
                desktop: () => cy.get('h2.MuiTypography-root').eq(0).should('be.visible'),
                mobile: () => cy.get('div.css-nvdmui')
            }),
        clickContinuar: () =>
            responsiveGet({
                desktop: () => cy.contains('button', 'Continuar'),
                mobile: () => cy.contains('button', 'Continuar')
            }),
    }

    checkout1Assert() {
        this.elements.checkout1Assert().should('be.visible');
    }

    detallesEstadiaAssert() {
        this.elements.detallesEstadiaAssert().should('be.visible');
    }

    clickContinuar() {
        this.elements.clickContinuar().should('be.visible').scrollIntoView().click();
    }

}

export default Checkout_1Page;
