@Home
Feature: Frontend - LandingPersonal validations
    Background: 
        Given el usuario abre la url_landingPersonalizada_SIRO

@TC-1 @TOURIST @Frontend  @LandingPersonal_SIRO  @OK_RUN
    Scenario: Validacion de presencia de elementos    
        Then el sistema muestra descripcion del alojamiento 
        And el sistema muestra el boton 'Reservar ahora'
        And el sistema muestra los servicios que ofrece
        And el sistema muestra opciones disponibles
        And el sistema muestra las valoraciones
        And el sistema muestra las reseñas
        And el sistema muestra la ubicacion del alojamiento
        And el sistema muestra las condiciones de la reserva
        And el sistema muestra politica de la reserva
        And el sistema muestra las normas del alojamiento
        And el sistema muestra el horario de ingreso y egreso
        And el sistema muestra la politica de garantia
        And el sistema muestra las formas de pago
        And el sistema muestra el footer de la landing


@TC-3 @TOURIST @Frontend @LandingPersonal_SIRO 
    Scenario: reserva en fecha disponible 
    When el usuario selecciona fecha inicio y fin de reserva disponible
    Then el sistema muestra el boton Reservar 

@TC-4 @TOURIST @Frontend @LandingPersonal_SIRO 
    Scenario: reserva SIRO en fecha disponible 
    When el usuario selecciona fecha inicio y fin de reserva disponible
    Then el sistema muestra el boton Reservar 
    And el usuario hace clic en Reservar 

 


        


