/// <reference types="Cypress" />

context('Iubenda GTM', () => {
  it('The Iubenda cookie footer should push the event to the GTM data layer', () => {
    cy.visit('http://localhost:9000');
    cy.get("#iubenda-cs-banner").should("exist");
    cy.get(".iubenda-cs-close-btn").should("exist");

    cy.window().then(win => {
      win.dataLayer = [];
    });

    cy.get(".iubenda-cs-close-btn").click();

    cy.window().its('dataLayer').should('contain', { event: "iubenda_consent_given" });
  })
})
