import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage  from '../../../pages/HomePage';
import LoginPage from '../../../pages/LoginPage';
import ListingPage from '../../../pages/ListingPage';    

const home = new HomePage();
const login = new LoginPage();

Then("el sistema muestra el banner", () => {
    home.bannerAssert()
});

Then("el sistema muestra la seccion de most book destinations", () => {
    home.mostBookDestinationAssert()
});

Then("el sistema muestra el link de descarga de la app android y IOS", () => {
    home.appHomeLinkAssert();
});

Then("el sistema muestra el footer", () => {
    home.footerAssert();
});