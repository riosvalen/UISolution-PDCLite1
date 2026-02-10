@CheckoutLanding
Feature: Frontend - Checkout Landing SIRO

Background:
  Given el usuario abre la url_landingPersonalizada_SIRO

@TC-1 @TOURIST @Frontend @CheckoutLanding @LandingPersonal_SIRO @OK_RUN @desktop @mobile 
Scenario: reserva SIRO en fecha disponible
  When el usuario selecciona fecha inicio y fin de reserva disponible
  Then el usuario selecciona una tipologia disponible
  Then el usuario hace clic en Reservar
  Then el usuario es redirigido a la pagina de checkout 1
  Then el usuario visualiza los detalles de su estadia en checkout 1  
  Then el usuario hace clic en 'Continuar' en checkout 1  
  Then el usuario es redirigido a la pagina de checkout 2
  Then el usuario ingresa "<Nombre>" "<Apellido>" "<DNI>" "<Telefono>" "<Email>"
  Then el usuario hace clic en 'Continuar' en checkout 2
  Then el usuario es redirigido a la pagina de checkout 3 y saluda a "<Nombre>"
  Then el usuario visualiza los detalles de su estadia en checkout 3
  Then el usuario selecciona medio de pago 'Tarjeta de Débito - Crédito'
  Then el usuario hace clic en 'Solicitar reserva'
  Then el usuario es redirigido a la pantalla Thanks

Examples:
  | Nombre | Apellido | DNI       | Telefono     | Email                          |
  | Flor   | Cornier Automation | 30123456  | 3516534065   | fcornier@alquilerargentina.com |

