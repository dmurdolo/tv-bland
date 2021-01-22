/// <reference types="cypress" />

context('Show', () => {
    describe('Display show details', () => {
        it('Loads the show page', () => {
            cy.visit('/show/7522');
        });

        it('Displays the show image', () => {
            cy.get('.show-image').should('be.visible');
        });

        it('Displays the rating', () => {
            cy.get('.Rating_stars__2tgoH').should('be.visible');
        });

        it('Navigates back to the home page', () => {
            cy.get('header').find('a').click();
        });
    });
});