import { responsiveGet } from "../utils/responsive";

class HomePage {
    elements = {
        menuBtn: () => cy.get('[data-testid="MenuIcon"]'),
        searchInput: () =>
            responsiveGet({
                desktop: () => cy.get('input[autocomplete="off"]'),
                mobile: () => cy.get('.MuiTypography-secondary'),
            }),
        searchBtn: () =>
            responsiveGet({
                desktop: () => cy.get('.css-mhe0au > .MuiButton-root'),
                mobile: () => cy.contains('button', 'Buscar'),
            }),
        homeBanner: () => cy.contains('p', 'Encontrá tu próximo destino'),
        mostBookDestinationSection: () => cy.get('.css-nos0su'),
        mostBookDestinationtitle: () => cy.contains('h5', 'Destinos más visitados'),
        androidHomeLink: () =>
            responsiveGet({
                desktop: () => cy.get('.css-1om4g5v > :nth-child(1) > a > img'),
                mobile: () => cy.get('.css-e585x0 > :nth-child(1) > a > img')
            }),
        iosHomeLink: () =>
            responsiveGet({
                desktop: () => cy.get('.css-1om4g5v > :nth-child(2) > a > img'),
                mobile: () => cy.get('.css-e585x0 > :nth-child(2) > a > img'),
            }),
        footerElement: () =>
            responsiveGet({
                desktop: () => cy.get('.css-1vz6cwa'),
                mobile: () => cy.get('.css-e585x0 > :nth-child(2) > a > img'),
            }),

        localityElement: () =>
            responsiveGet({
                desktop: () => cy.get('li[role="option"] p').eq(0),
                mobile: () => cy.get('#use-autocomplete-option-0'),
            }),

        calendarCloseElement: () =>
            responsiveGet({
                desktop: () => cy.get('div.MuiBackdrop-invisible'),
                mobile: () => cy.get('.MuiDialog-root svg').first().should('be.visible'),
            }),

    };

    closeCalendar() {
        this.elements.calendarCloseElement().click()
    };

    selectLocality() {
        this.elements.localityElement().click()
    };

    footerAssert() {
        this.elements.footerElement().should('be.visible');
    };

    appHomeLinkAssert() {
        this.elements.androidHomeLink().should('be.visible');
        this.elements.iosHomeLink().should('be.visible');
    };

    mostBookDestinationAssert() {
        this.elements.mostBookDestinationSection().should('be.visible');
        this.elements.mostBookDestinationtitle().should('have.text', 'Destinos más visitados');
    };

    bannerAssert() {
        this.elements.homeBanner().should('be.visible').should('have.text', 'Encontrá tu próximo destino')
    };

    sendDestination(destino) {
        this.elements.searchInput().click(); //Click en el input (abre modal en mobile)
        cy.get('input[type="text"]', { timeout: 4000 }) // 2) Si aparece input real del modal lo tipea en el de mobile
            .then(($input) => {
                // Si el modal esta abierto, usa el imput del modal
                if ($input.length > 0) {
                    cy.wrap($input).type(destino, { delay: 100 });
                    // Pero si detecta que es desktop, tipea en el campo de desktop
                } else {
                    this.elements.searchInput().type(destino, { delay: 100, force: true });
                }
            });
    }


    clickSearch() {
        this.elements.searchBtn().click();
    }

};



export default HomePage;