import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../pages/LoginPage';
const login = new LoginPage();

// Obtenemos el entorno actual de Cypress
// Esto nos permite usar diferentes configuraciones según el entorno (TST, STG, etc.)
const envi = Cypress.env('ENV') || 'TST';
// Obtenemos la URL base de la aplicación según el entorno
const url = Cypress.env(envi).url_apollo;
//transformar variable a alias
//cy.wrap(usuario).as("nombreUsuario")
//cy.wrap(contraseña).as("contraseñaUsuario")

Given("el usuario abre la web de Apollo", () => {
    cy.visit(`${url}`);
});

When("el usuario hace click en iniciar sesion", () => {
    login.clickLogin()
});

Then("el sistema abre el modal de inicio de sesion", () => {
    login.compareLoginModal();
});

When("el usuario ingresa el correo electronico {string} tourist valido", (usuario) => {
    usuario = Cypress.env(envi).touristUsername;
    login.sendUsername(usuario);
});

When("el usuario ingresa la contraseña {string} turista", (contraseña) => {
    contraseña = Cypress.env(envi).touristPassword;
    login.sendPassword(contraseña);
})

When("el usuario ingresa el correo electronico {string} valido", (usuario) => {
    cy.log(usuario)
    if (usuario == "correo_turista") {
        usuario = Cypress.env(envi).touristUsername
        login.sendUsername(usuario);
    }
    else if (usuario == "correo_partner_sic") {
        usuario = Cypress.env(envi).sicUsername;
        login.sendUsername(usuario);
    }
    else if (usuario == "correo_partner_siro") {
        usuario = Cypress.env(envi).siroUsername;
        login.sendUsername(usuario);
    }

});

When("el usuario hace click en continuar", () => {
    login.clickNextStep();
});

When("el usuario ingresa la contraseña {string} valida", (contraseña) => {
    cy.log(contraseña)
    if (contraseña == "contraseña_turista") {
        contraseña = Cypress.env(envi).touristPassword;
        login.sendPassword(contraseña);
    }
    else if (contraseña == "contraseña_sic") {
        contraseña = Cypress.env(envi).sicPassword;
        login.sendPassword(contraseña);
    }
    else if (contraseña == "contraseña_siro") {
        contraseña = Cypress.env(envi).siroPassword;
        login.sendPassword(contraseña);
    }
});

When("el usuario ingresa el correo electronico {string} partner SIRO valido", (usuario) => {
    usuario = Cypress.env(envi).siroUsername;
    login.sendUsername(usuario);
});

When("el usuario ingresa el correo electronico {string} partner SIC valido", (usuario) => {
    usuario = Cypress.env(envi).sicUsername;
    login.sendUsername(usuario);
});

When("el usuario hace click en continuar al sitio turista", () => {
    login.clickContinueToSiteTourist();
});

When("el usuario hace click en continuar al sitio partner", () => {
    login.clickContinueToSitePartner();
})

Then("el sistema muestra el modal de ingreso", () => {
    login.compareWelcomeModal();
});

Then("el sistema muestra la home de apollo", () => {
    login.compareApolloHome();
});

When("el usuario ingresa el correo electronico no valido", () => {
    login.SendInvalidUser();
});

Then("el sistema muestra el modal de registro", () => {
    login.compareSignUpModal();
});

When("el usuario ingresa una contraseña invalida", () => {
    login.sendInvalidPassword();
});

Then("el sistema muestra error en la contraseña", () => {
    login.failedPassMessage();
});

When("el usuario hace click en ingresar al panel", () => {
    cy.log("antes del click")
    cy.wait(5000)
    login.clikIngressPanel();
    cy.log("hizo click y termino el step")
});

Then("el sistema muestra la home de pdclite", () => {
    cy.log("Hola mundo")
    login.visitPdcLiteHome()
});

When("el usuario hace click en el menu", () => {
    login.clickMenuApollo();
});

When("el usuario hace click en cerrar sesion", () => {
    login.clickLogout();
});

Then("el sistema muestra el menu con el boton de inicio de sesion", () => {
    login.compareLogout();
});

Given("el turista esta logueado", () => {
    cy.visit(`${url}`);
    login.clickLogin();
    login.compareLoginModal();
    usuario = Cypress.env(envi).touristUsername;
    login.sendUsername(usuario);
    login.clickNextStep();
    contraseña = Cypress.env(envi).touristPassword;
    login.sendPassword(contraseña);
    login.clickNextStep();
    login.compareWelcomeModal();
    login.clickNextStep();
    login.compareApolloHome();
})








