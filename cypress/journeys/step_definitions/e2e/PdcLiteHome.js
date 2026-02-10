import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import pdcliteHomePage from '../../../pages/pdcliteHomePage';
const pdclitehome = new pdcliteHomePage();

When('el usuario saltea el onboarding', () => {
    pdclitehome.jumpOnBoarding();
    pdclitehome.closeOnBoarding();
});

Then('el sistema muestra la seccion de reservas', () => {
    pdclitehome.pdcLiteHomeReservations();
});

