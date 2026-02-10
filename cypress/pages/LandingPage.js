import { responsiveGet } from "../utils/responsive";

export default class LandingPage {

    elements = {
        btnReservarAhora: () => cy.get('button[type="button"]').eq(0),
        // Selectores para el calendario y reserva
        openerFechaLlegada: () => responsiveGet({
            desktop: () => cy.contains('p', 'Llegada').parent(),
            mobile: () => cy.get('[data-testid="guests-input"] > .MuiGrid-root > .MuiTypography-root')
        }),
        openerFechaSalida: () => cy.contains('p', 'Salida').parent(), // En mobile se abre con "Estadía" (el de arriba), este podría no usarse o ser igual
        diasCalendario: () => cy.get('button.rdp-day_button:not([disabled])'), // Solo días habilitados
        btnAplicarCalendario: () => responsiveGet({
            desktop: () => cy.contains('button', 'Aplicar'),
            mobile: () => cy.get(':nth-child(20) > .MuiDialog-container > .MuiPaper-root > .MuiDialogContent-root > :nth-child(1) > .css-1hz0jbq > .css-zxjnhq > .MuiBox-root > .MuiButtonBase-root')
        }),
        btnReservar: () => cy.get('[data-testid="BookingSummaryContainer"]').contains('button', 'Reservar'),
        descripcionElement: () => cy.get('p.MuiTypography-body1'),
        serviciosElement: () => cy.get('.MuiTypography-root.MuiTypography-h2'),
        opcionesDisponibles: () => cy.get('article[data-observer="Listing Details Availability"] p').eq(0),
        valoraciones: () => cy.get('.MuiTypography-root.MuiTypography-h2'),
        reseñas: () => cy.get('span[data-testid="VorationsIATitle"]'),
        ubicacion: () => cy.get(':nth-child(4) > :nth-child(1) > .MuiBox-root > .MuiList-root > .MuiListItem-root > .MuiGrid-container > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body1'),
        condicionesReserva: () => cy.contains('h2', 'Condiciones de la reserva'),
        politicaCancelacion: () => cy.contains('h2', 'Política de cancelación'),
        normasAlojamiento: () => cy.contains('h2', 'Normas del alojamiento'),
        horarioIngEgreso: () => cy.contains('h2', 'Horarios de ingreso y egreso'),
        politicaGarantia: () => cy.contains('h2', 'Política de garantía'),
        formasPago: () => cy.contains('h2', 'Formas de pago'),
        footerElement: () => responsiveGet({
            desktop: () => cy.get('.css-xps1gz'), // Mantenemos el legacy por si acaso
            mobile: () => cy.contains('Powered by Alquiler Argentina')
        }),
        tipologiaElement: () => cy.get('input[type="radio"]').eq(0)
    };

    seleccionarTipologia() {
        // Esperamos que aparezcan opciones y seleccionamos la primera
        this.elements.tipologiaElement().should('exist').scrollIntoView().click();
    }

    /**
     * Selecciona fechas disponibles en el calendario.
     * @param {number} diasInicioOffset - Días a sumar desde hoy para el check-in (default: 2)
     * @param {number} duracionDias - Duración de la estadía (default: 3)
     */
    seleccionarFechas(diasInicioOffset = 2, duracionDias = 5) {
        // Abrir el calendario haciendo clic en "Llegada"
        this.elements.openerFechaLlegada().scrollIntoView().should('be.visible').click({ force: true });

        // Esperar a que el calendario sea visible (opcional, pero buena práctica)
        this.elements.diasCalendario().should('be.visible');

        // Seleccionar fecha de llegada (usamos eq para seleccionar por índice entre los disponibles)
        // Nota: Esto asume que hay suficientes días disponibles visibles.
        this.elements.diasCalendario().eq(diasInicioOffset).click({ force: true });

        // Seleccionar fecha de salida
        this.elements.diasCalendario().eq(diasInicioOffset + duracionDias).click({ force: true });

        // Hacer clic en Aplicar (Obligatorio en Mobile y Desktop )
        this.elements.btnAplicarCalendario().scrollIntoView().should('be.visible').click({ force: true });
    }

    // NUEVA FUNCIONALIDAD PARA FECHAS CLAVE! 

    seleccionarFechasConDisponibilidad(intent = 0) {
        const MAX_INTENTOS = 6;

        if (intent >= MAX_INTENTOS) {
            throw new Error(`❌ No se encontró disponibilidad luego de ${MAX_INTENTOS} intentos`);
        }

        cy.log(`📅 Intento ${intent + 1}/${MAX_INTENTOS} buscando disponibilidad`);

        // Variamos las fechas
        this.seleccionarFechas(2 + intent, 5);

        // Esperamos a que la UI procese disponibilidad
        cy.wait(800);

        cy.get('body').then(($body) => {
            const hayReservar =
                $body.find('[data-testid="BookingSummaryContainer"] button:contains("Reservar")').length > 0;

            const hayTipologia =
                $body.find('input[type="radio"]').length > 0;

            if (hayReservar && hayTipologia) {
                cy.log('✅ Fechas con disponibilidad encontradas');
                return;
            }

            cy.log('🔄 Sin disponibilidad, reintentando con otras fechas');
            this.seleccionarFechasConDisponibilidad(intent + 1);
        });
    }


    clickReservar() {
        this.elements.btnReservar().click();
    }

    btnReservarAssert() {
        this.elements.btnReservar().should('be.visible').and('not.be.disabled');
    }

    btnReservarAhoraAssert() {
        this.elements.btnReservarAhora().should('be.visible');
    }

    descripcionAssert() {
        this.elements.descripcionElement().should('be.visible');
    }

    serviciosAssert() {
        this.elements.serviciosElement().should('be.visible');
    }

    opcionesDisponiblesAssert() {
        this.elements.opcionesDisponibles().should('be.visible');
    }

    valoracionesAssert() {
        this.elements.valoraciones().should('be.visible');
    }

    reseñasAssert() {
        this.elements.reseñas().should('be.visible');
    }

    ubicacionAssert() {
        this.elements.ubicacion().should('be.visible');
    }

    condicionesReservaAssert() {
        this.elements.condicionesReserva().should('be.visible');
    }

    politicaCancelacionAssert() {
        this.elements.politicaCancelacion().should('be.visible');
    }

    normasAlojamientoAssert() {
        this.elements.normasAlojamiento().should('be.visible');
    }

    horarioIngEgresoAssert() {
        this.elements.horarioIngEgreso().should('be.visible');
    }

    politicaGarantiaAssert() {
        this.elements.politicaGarantia().should('be.visible');
    }

    formasPagoAssert() {
        this.elements.formasPago().should('be.visible');
    }

    footerAssert() {
        this.elements.footerElement().should('be.visible');
    }

    tipologiaAssert() {
        this.elements.tipologiaElement().should('be.visible').click();
    }

}