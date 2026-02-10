@Checkout @OK_RUN @ficha @FRONTEND @desktop @mobile
Feature: Checkout completo desde ficha

Background:
  Given el usuario abre una ficha SIRO

@TC1 @TOURIST @FRONTEND @Checkout @OK_RUN @desktop @mobile
Scenario: Reserva completa desde ficha SIRO
  When el usuario selecciona fecha inicio y fin de reserva disponible
  Then el usuario selecciona una tipologia disponible
  Then el usuario hace clic en Reservar

  Then el usuario es redirigido a la pagina de checkout 1
  Then el usuario visualiza los detalles de su estadia en checkout 1
  Then el usuario hace clic en 'Continuar' en checkout 1

  Then el usuario es redirigido a la pagina de checkout 2
  Then el usuario ingresa "Flor" "Cornier Automation" "30123456" "3516534065" "fcornier@alquilerargentina.com"
  Then el usuario hace clic en 'Continuar' en checkout 2

  Then el usuario es redirigido a la pagina de checkout 3 y saluda a "Flor"
  Then el usuario selecciona medio de pago 'Tarjeta de Débito - Crédito'
  Then el usuario hace clic en 'Solicitar reserva'

  Then el usuario es redirigido a la pantalla Thanks

  
  @TC2 @TOURIST @SIC @desktop @mobile
Scenario: Reserva completa desde ficha SIC
  Given el usuario abre una ficha sic
  When el usuario selecciona fecha inicio y fin de reserva disponible
  Then el usuario selecciona una tipologia disponible
  Then el usuario hace clic en Reservar

  Then el usuario es redirigido a la pagina de checkout 1
  Then el usuario visualiza los detalles de su estadia en checkout 1
  Then el usuario hace clic en 'Continuar' en checkout 1

  Then el usuario es redirigido a la pagina de checkout 2
  Then el usuario ingresa "Flor SIC" "Cornier Automation" "30123456" "3516534065" "fcornier@alquilerargentina.com"
  Then el usuario hace clic en 'Continuar' en checkout 2

  Then el usuario es redirigido a la pagina de checkout 3 y saluda a "Flor SIC"
  Then el usuario selecciona medio de pago 'Tarjeta de Débito - Crédito'
  Then el usuario hace clic en 'Solicitar reserva'

  Then el usuario es redirigido a la pantalla Thanks

