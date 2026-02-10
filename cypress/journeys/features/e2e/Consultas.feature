Feature: Frontend - Consultas en una ficha
    Background: 
      Given el usuario abre una ficha sic    
    @OK_RUN @consultas
    Scenario: Consulta por wpp usuario no logueado
        When el usuario hace click en contactar alojamiento
        Then el sistema muestra el calendario
        When el usuario selecciona fechas
        And el usuario hace click en aplicar  
        And el alojamiento esta disponible para la consulta       
        And el usuario hace click en contactar alojamiento
        Then el sistema muestra la seccion de consultas
        When el usuario completa nombre, email y telefono
        And el usuario hace click en el boton de contacto wpp
        Then el sistema intenta abrir la pestaña de wpp
        And el sistema muestra un modal de confirmacion de envio 
        #When el usuario cierra el modal de confirmacion de envio 
        #Then el sistema muestra thank you page confirmacion de envio

    @OK_RUN @consultas
    Scenario: Consulta por email usuario no logueado
        When el usuario hace click en contactar alojamiento
        Then el sistema muestra el calendario
        When el usuario selecciona fechas
        And el usuario hace click en aplicar
        And el alojamiento esta disponible para la consulta         
        And el usuario hace click en contactar alojamiento
        Then el sistema muestra la seccion de consultas
        When el usuario completa nombre, email y telefono
        And el usuario hace click en el boton de contacto email
        Then el usuario escribe un mensaje
        And el usuario hace click en enviar
        Then el sistema muestra un modal de confirmacion de envio
        #When el usuario cierra el modal de confirmacion de envio 
        #Then el sistema muestra thank you page confirmacion de envio

    @OK_RUN @consultas
    Scenario: Consulta por llamada usuario no logueado
        When el usuario hace click en contactar alojamiento
        Then el sistema muestra el calendario
        When el usuario selecciona fechas
        And el usuario hace click en aplicar
        And el alojamiento esta disponible para la consulta         
        And el usuario hace click en contactar alojamiento
        Then el sistema muestra la seccion de consultas
        When el usuario completa nombre, email y telefono
        And el usuario hace click en el boton de contacto llamada
        Then el sistema muestra el telefono del partner