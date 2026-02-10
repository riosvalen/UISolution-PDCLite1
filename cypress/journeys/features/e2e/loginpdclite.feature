Feature: Frontend - Login PDC Lite via Apollo

  @OK_RUN
  Scenario: Iniciar sesion en Apollo y navegar al panel de PDC Lite
    Given el usuario abre la web de Apollo
    When el usuario inicia sesion como partner "SIRO"
    And el usuario hace click en ingresar al panel
    Then el sistema muestra la home de pdclite

  #@OK_RUN
  #Scenario: Iniciar sesion en Apollo y navegar al panel de PDC Lite
    #Given el usuario abre la web de Apollo
    #When el usuario inicia sesion como partner "SIRO"
    #And el usuario hace click en ingresar al panel
    #Then el sistema muestra la home de pdclite  
    #When el usuario saltea el onboarding
    #Then el sistema muestra la seccion de reservas

