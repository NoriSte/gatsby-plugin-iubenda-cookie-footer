/// <reference types="Cypress" />

context('Iubenda custom GTM', () => {
  it('The Iubenda cookie footer should push the event to the GTM data layer with a custom configuration too', () => {
    cy.visit('http://localhost:9000');
    cy.get("#iubenda-cs-banner").should("exist");
    cy.get(".iubenda-cs-close-btn").should("exist");

    cy.window().then(win => {
      win.customDataLayerName = [];
    });

    cy.get(".iubenda-cs-close-btn").click();

    cy.window().its('customDataLayerName').should('contain', { event: "custom_iubenda_event_name" });
  })
})
