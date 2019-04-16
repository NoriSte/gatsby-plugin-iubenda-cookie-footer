/// <reference types="Cypress" />

context('Iubenda', () => {
  it('The Iubenda cookie footer should push the event to the GHTM data layer', () => {
    cy.visit('http://localhost:9000');
    cy.get("#iubenda-cs-banner").should("exist");
    cy.get(".iubenda-cs-close-btn").should("exist");

    // see https://docs.cypress.io/api/commands/stub.html#Method

    cy.get(".iubenda-cs-close-btn").click();



    // cy.window().its('dataLayer.push').should('be.called')


  })
})
