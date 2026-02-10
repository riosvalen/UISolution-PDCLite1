@Home
Feature: Frontend - Home validations
    Background: 
        Given el usuario abre la web de Apollo


@Frontend @Home @HomeElements @PROD @STG @OK_RUN
    Scenario: Validacion de presencia de elementos    
        Then el sistema muestra el banner
        And el sistema muestra la seccion de most book destinations
        And el sistema muestra el link de descarga de la app android y IOS
        And el sistema muestra el footer
