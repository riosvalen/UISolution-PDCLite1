import { responsiveGet } from '../utils/responsive';

class pdcliteHomePage {
    elements = {
        pdcLiteHomeUrl: () => cy.url({ timeout: 120000 }).should('include', 'https://pdclite.aatest.host/sire/44498/listado'),
        pdcLiteHome: () => cy.contains('h6', 'Gestor de reservas'),
    }

    visitPdcLiteHome() {
        cy.url({ timeout: 120000 }).should('include', 'https://pdclite.aatest.host/sire/44498/listado');
        this.elements.pdcLiteHome().should("be.visible");
    }
}

export default pdcliteHomePage