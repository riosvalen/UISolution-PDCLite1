import { responsiveGet } from "../utils/responsive";

class FichaPage {
    elements = {
        contactBtn: () =>
            responsiveGet({
                desktop: () => cy.get('button[data-testid="boton-contactar"]'),
                mobile: () => cy.contains('button', 'Contactar'),
            }),
        fichaCalendar: () =>
            responsiveGet({
                desktop: () => cy.get('div.rdp-month_caption').eq(1),
                mobile: () => cy.get('div.rdp-month_caption').filter(':visible').first(),
            }),
        nextMonthBtn: () =>
            responsiveGet({
                desktop: () => cy.get('.rdp-button_next'),
                mobile: () => cy.get('button[aria-label="Go to the Next Month"]'),
            }),
        startDate: () =>
            responsiveGet({
                desktop: () => cy.get('button.rdp-day_button').contains('15'),
                mobile: () => cy.get('button.rdp-day_button').contains('15'),
            }),
        endDate: () =>
            responsiveGet({
                desktop: () => cy.get('button.rdp-day_button').contains('20'),
                mobile: () => cy.get('button.rdp-day_button').contains('20')
            }),
        applyButtom: () =>
            responsiveGet({
                desktop: () => cy.get('button.MuiButton-containedSizeMedium'),
                mobile: () => cy.contains('button', 'Aplicar')
            }),
        contactModal: () =>
            responsiveGet({
                desktop: () => cy.get('button.MuiButton-containedSizeMedium'),
                mobile: () => cy.get('button.MuiButton-containedSizeMedium')
            }),

        imputName: () =>
            responsiveGet({
                desktop: () => cy.contains('label', 'Nombre y apellido').parent().find('input'),
                mobile: () => cy.contains('label', 'Nombre y apellido').parent().find('input')
            }),

        imputEmail: () =>
            responsiveGet({
                desktop: () => cy.contains('label', 'Correo electrónico').parent().find('input'),
                mobile: () => cy.contains('label', 'Correo electrónico').parent().find('input')
            }),

        imputPhone: () =>
            responsiveGet({
                desktop: () => cy.contains('label', 'Número de teléfono').parent().find('input'),
                mobile: () => cy.contains('label', 'Número de teléfono').parent().find('input')
            }),

        btnWpp: () =>
            responsiveGet({
                desktop: () => cy.contains('p', 'WhatsApp'),
                mobile: () => cy.contains('p', 'WhatsApp')
            }),

        btnEmail: () =>
            responsiveGet({
                desktop: () => cy.contains('p', 'Correo electrónico'),
                mobile: () => cy.contains('p', 'Correo electrónico')
            }),

        callBtn: () =>
            responsiveGet({
                desktop: () => cy.contains('p', 'Llamada telefónica'),
                mobile: () => cy.contains('p', 'Llamada telefónica')
            }),

        confirmationModal: () =>
            responsiveGet({
                desktop: () => cy.get('.css-1rlq0mn > .MuiGrid-spacing-xs-1 > .css-1wxaqej > .MuiTypography-root'),
                mobile: () => cy.contains('p', '¡Felicitaciones!')
            }),

        closeConfirmationModalBtn: () =>
            responsiveGet({
                desktop: () => cy.contains('button', 'Listo'),
                mobile: () => cy.contains('button', 'Listo')
            }),

        wppThankYouPageModal: () =>
            responsiveGet({
                desktop: () => cy.contains('p', '¡Felicitaciones!'),
                mobile: () => cy.contains('p', '¡Felicitaciones!')
            }),

        bodyEmailImput: () =>
            responsiveGet({
                desktop: () => cy.contains('label', 'Comentario adicional').parent().find('textarea').first(),
                mobile: () => cy.contains('label', 'Comentario adicional').parent().find('textarea').first()
            }),

        sendEmailBtn: () =>
            responsiveGet({
                desktop: () => cy.contains('button', 'Enviar'),
                mobile: () => cy.contains('button', 'Enviar')
            }),

        callThankiuPageModal: () =>
            responsiveGet({
                desktop: () => cy.get('[data-testid="typography"]').should('contain.text', 'Llamar al alojamiento'),
                mobile: () => cy.get('[data-testid="typography"]').should('contain.text', 'Llamar al alojamiento')
            }),
        galleryElement: () =>
            responsiveGet({
                desktop: () => cy.get('img[fetchpriority="high"]'),
                mobile: () => cy.get('div.css-nnmshm')
            }),
        shareBtn: () =>
            responsiveGet({
                desktop: () => cy.get('svg[data-testid="ShareOutlinedIcon"]'),
                mobile: () => cy.get('svg[data-testid="ShareOutlinedIcon"]')
            }),
        bookingSumaryElement: () =>
            responsiveGet({
                desktop: () => cy.contains('p', 'Precio por noche'),
                mobile: () => cy.get('div[class*="css-lzr"]')
            }),
        fauvoriteBtn: () =>
            responsiveGet({
                desktop: () => cy.get('svg[data-testid="ShareOutlinedIcon"]'),
                mobile: () => cy.get('svg[data-testid="ShareOutlinedIcon"]')
            }),





        optionsTitle: () =>
            responsiveGet({
                desktop: () => cy.get('.css-vnldl1'),
                mobile: () => cy.get('div[class*="css-lzr"]')
            }),

        ratingsTitle: () =>
            responsiveGet({
                desktop: () => cy.contains('h2', 'Valoraciones de Cabaña pepito mi mejor amigo 2'),
                mobile: () => cy.get('div.MuiGrid-item').eq(66)
            }),

        locationTitle: () =>
            responsiveGet({
                desktop: () => cy.contains('h2', 'Ubicación de Cabaña pepito mi mejor amigo 2'),
                mobile: () => cy.get('div[class*="css-lzr"]')
            }),

        googleMapsLink: () =>
            responsiveGet({
                desktop: () => cy.get('button[data-key="listing_details_location_google_maps"]'),
                mobile: () => cy.get('div.css-nnmshm')
            }),

        conditionsTitle: () =>
            responsiveGet({
                desktop: () => cy.contains('h2', 'Condiciones de la reserva'),
                mobile: () => cy.get('div[class*="css-lzr"]')
            }),

        cancellationsPoliciesTitle: () =>
            responsiveGet({
                desktop: () => cy.contains('h2', 'Política de cancelación'),
                mobile: () => cy.get('div[class*="css-lzr"]')
            }),

        standardsTitle: () =>
            responsiveGet({
                desktop: () => cy.contains('h2', 'Normas del alojamiento'),
                mobile: () => cy.get('div[class*="css-lzr"]')
            }),

        schedulesTitle: () =>
            responsiveGet({
                desktop: () => cy.contains('h2', 'Horarios de ingreso y egreso'),
                mobile: () => cy.get('div[class*="css-lzr"]')
            }),

        warrantyPolicyTitle: () =>
            responsiveGet({
                desktop: () => cy.contains('h2', 'Política de garantía'),
                mobile: () => cy.get('div[class*="css-lzr"]')
            }),

        paymentMethodsTitle: () =>
            responsiveGet({
                desktop: () => cy.contains('h2', 'Formas de pago'),
                mobile: () => cy.get('div[class*="css-lzr"]')
            }),

    };

    callThankiuPage() {
        this.elements.callThankiuPageModal().should('be.visible')
    }

    clickCallBtn() {
        this.elements.callBtn().click()
    }

    clickSendEmail() {
        this.elements.sendEmailBtn().click({ force: true })
    }

    writeEmail() {
        this.elements.bodyEmailImput().type('Consulta random')
    }

    wppThankYouPage() {
        this.elements.wppThankYouPageModal().should('be.visible')
    }

    closeConfirmationModal() {
        this.elements.closeConfirmationModalBtn().click()
    }

    sentSuccessfully() {
        this.elements.confirmationModal().should('be.visible')
    }

    clickWpp() {
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen');
        });

        this.elements.btnWpp().click();
    }

    clickEmail() {
        this.elements.btnEmail().click()
    }

    sendPhone() {
        this.elements.imputPhone().type('3516412525', { force: true })
    }

    sendEmail() {
        this.elements.imputEmail().type('automation@alquilerargentina.com', { force: true })
    }

    sendName() {
        this.elements.imputName().type('valentina', { force: true })
    }

    contactClick() {
        this.elements.contactBtn().click({ force: true })
    }

    calendarValidation() {
        this.elements.fichaCalendar().should('be.visible')
    }

    selectMonth() {
        this.elements.nextMonthBtn().first().click({ force: true })
    }

    selectDates() {
        this.elements.startDate().click({ force: true })
        this.elements.endDate().click({ force: true })
    }

    disableBtnContact() {
        this.elements.contactBtn().should('not.be.disabled');
    }

    applyDates() {
        this.elements.applyButtom().click({ force: true })
    }

    galleryAssert() {
        this.elements.galleryElement().should('be.visible')
    }

    shareAssert() {
        this.elements.shareBtn().should('be.visible')
    }

    fauvoriteAssert() {
        this.elements.fauvoriteBtn().should('be.visible')
    }

    bookingSumaryAssert() {
        this.elements.bookingSumaryElement().should('be.visible')
    }

    servicesAssert() {
        this.elements.servicesTitle().should('be.visible').should('contain.text', 'Servicios que ofrece')
    }

    optionsAssert() {
        this.elements.optionsTitle().should('be.visible').should('contain.text', 'Opciones disponibles')
    }

    ratingsAssert() {
        this.elements.ratingsTitle().should('be.visible')
    }

    locationAssert() {
        this.elements.locationTitle().should('be.visible').should('contain.text', 'Ubicación');
        this.elements.googleMapsLink().should('be.visible')
    }

    conditionsAssert() {
        this.elements.conditionsTitle().should('be.visible').should('contain.text', 'Condiciones de la reserva')
    }

    cancellationsPoliciesAssertion() {
        this.elements.cancellationsPoliciesTitle().should('be.visible').should('contain.text', 'Política de cancelación')
    }

    standardsAssertion() {
        this.elements.standardsTitle().should('be.visible').should('contain.text', 'Normas del alojamiento')
    }

    schedulesAssertion() {
        this.elements.schedulesTitle().should('be.visible').should('contain.text', 'Horarios de ingreso y egreso')
    }

    warrantyPolicyAssertion() {
        this.elements.warrantyPolicyTitle().should('be.visible').should('contain.text', 'Política de garantía')
    }

    paymentMethodsAssertion() {
        this.elements.paymentMethodsTitle().should('be.visible').should('contain.text', 'Formas de pago')
    }


};


export default FichaPage;