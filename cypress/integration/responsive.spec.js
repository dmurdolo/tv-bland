/// <reference types="cypress" />

context('Viewport', () => {
    beforeEach(() => {
      cy.visit('/');
    })
  
    it('should not show the rating on the home page for mobile', () => {  
      cy.viewport(320, 480);
      cy.get('.Rating_rating__17oDl').first().should('not.be.visible');
    });
  
    it('should show the rating on the home page for tablet and upwards', () => {  
      cy.viewport(1024, 768);
      cy.get('.Rating_rating__17oDl').first().should('be.visible');
    });
});
  