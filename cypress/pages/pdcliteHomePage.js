import { responsiveGet } from '../utils/responsive';

class pdcliteHomePage {
    elements = {
        pdcLiteHomeUrl: () => cy.url({ timeout: 120000 }).should('include', 'https://pdclite.aatest.host/sire/44498/listado'),
        pdcLiteHome: () => cy.contains('h6', 'Gestor de reservas'),
        startOnBoardingBtn: () => responsiveGet({
            desktop: () => cy.get('.css-1h16bbz-MuiGrid-root > .MuiButtonBase-root'),
            mobile: () => cy.get('[data-testid="start-onboarding-btn"]'),
        }),
        closeOnBoardingBtn: () => responsiveGet({
            desktop: () => cy.get('button[aria-label="Close"]'),
            mobile: () => cy.get('[data-testid="close-onboarding-btn"]'),
        }),

    }

    visitPdcLiteHome() {
        cy.url({ timeout: 120000 }).should('include', 'https://pdclite.aatest.host/sire/44498/listado');
        this.elements.pdcLiteHome().should("be.visible");
    }

    jumpOnBoarding() {
        this.elements.startOnBoardingBtn().click();
    }

    closeOnBoarding() {
        this.elements.closeOnBoardingBtn().click();
    }

    pdcLiteHomeReservations() {
        this.elements.pdcLiteHome().should("be.visible");
    }


}

export default pdcliteHomePage