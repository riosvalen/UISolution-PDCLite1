Feature: Frontend - Consultas en una ficha
    Background: 
      Given el usuario abre una ficha sic   
@OK_RUN @ficha @FRONTEND 
    Scenario: Validación de elementos en ficha
        And el sistema muestra las imagenes
        And el sistema muestra el icono compartir
        And el sistema muestra el icono para favoritos
        And el sistema muestra el booking sumary
        And el sistema muestra los servicios que ofrece
        And el sistema muestra las tipologías disponibles
        And el sistema muestra las valoraciones
        And el sistema muestra la ubicacion del alojamiento y el link de google maps
        And el sistema muestra las condiciones de la reserva
        And el sistema muestra la politica de cancelacion
        And el sistema muestra las normas del alojamiento
        And el sistema muestra horario de ingreso y egreso
        And el sistema muestra politica de garantia
        And el sistema muestra formas de pago del alojamiento