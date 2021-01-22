/// <reference types="cypress" />

context('Navigation', () => {
    describe('Visit site and navigate', () => {
        it('Loads the home page', () => {
            cy.visit('/');
        });

        it('Navigates to the home page', () => {
            cy.get('header').find('a').click();
        });

        it('Navigate to a show page', () => {
            cy.get('.Home_show__IPiK3').first().click();
        });
    });
});