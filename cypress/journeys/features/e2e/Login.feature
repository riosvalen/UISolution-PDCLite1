@Frontend 
Feature: Frontend - Login
  Background: 
    Given el usuario abre la web de Apollo
    When el usuario hace click en iniciar sesion
    Then el sistema abre el modal de inicio de sesion

  @TC-1 @TOURIST @OK_RUN @LOGIN  
  Scenario: Login usuario no registrado 
    When el usuario ingresa el correo electronico no valido
    And el usuario hace click en continuar
    Then el sistema muestra el modal de registro

  @TC-2 @TOURIST @OK_RUN @LOGIN 
  Scenario: Login usuario turista con credenciales no válidas
    When el usuario ingresa el correo electronico "<correo>" tourist valido
    And el usuario hace click en continuar
    And el usuario ingresa una contraseña invalida 
    And el usuario hace click en continuar
    Then el sistema muestra error en la contraseña

  @TC-3 @OK_RUN @LOGIN 
  Scenario Outline: Login usuario con credenciales válidas 
    When el usuario ingresa el correo electronico "<correo>" valido
    And el usuario hace click en continuar
    And el usuario ingresa la contraseña "<contraseña>" valida
    And el usuario hace click en continuar
    Then el sistema muestra el modal de ingreso
    When el usuario hace click en continuar al sitio turista
    Then el sistema muestra la home de apollo
      Examples:
        |rol           | correo                | contraseña        |
        | turista      | correo_turista       | contraseña_turista|
        | partner_sic  | correo_partner_sic   | contraseña_sic|
        | partner_siro | correo_partner_siro  | contraseña_siro|

# @TC-4 @PARTNER @OK_RUN @LOGIN  
# Scenario: Login partner SIC con ingreso a panel
#     When el usuario ingresa el correo electronico "<correo>" valido
#     And el usuario hace click en continuar
#     And el usuario ingresa la contraseña "<contraseña>" valida
#     And el usuario hace click en continuar
#     Then el sistema muestra el modal de ingreso
#     When el usuario hace click en ingresar al panel
#     Then el sistema muestra la home de pdclite
#       Examples:
#         |rol           | correo                | contraseña        |
#         | partner_sic  | correo_partner_sic    | contraseña_sic    |


  @TC-5 @PARTNERSIC @OK_RUN @LOGIN 
  Scenario: Login partner SIC con credenciales no validas
    When el usuario ingresa el correo electronico "<correo>" partner SIC valido
    And el usuario hace click en continuar
    And el usuario ingresa una contraseña invalida 
    And el usuario hace click en continuar
    Then el sistema muestra error en la contraseña

  @TC-6 @PARTNERSIRO @OK_RUN @LOGIN 
  Scenario: Login partner SIRO con credenciales no validas
    When el usuario ingresa el correo electronico "<correo>" partner SIRO valido
    And el usuario hace click en continuar
    And el usuario ingresa una contraseña invalida 
    And el usuario hace click en continuar
    Then el sistema muestra error en la contraseña

  @TC-7 @LOGOUT @OK_RUN @LOGIN 
  Scenario: Loguot  
    When el usuario ingresa el correo electronico "<correo>" tourist valido
    And el usuario hace click en continuar
    And el usuario ingresa la contraseña "<contraseña>" turista
    And el usuario hace click en continuar
    Then el sistema muestra el modal de ingreso
    When el usuario hace click en continuar
    Then el sistema muestra la home de apollo
    When el usuario hace click en el menu
    And el usuario hace click en cerrar sesion
    Then el sistema muestra el menu con el boton de inicio de sesion




  




    
    
    
    
