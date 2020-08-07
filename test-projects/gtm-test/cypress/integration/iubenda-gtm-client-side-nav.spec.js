/// <reference types="Cypress" />

context('Iubenda GTM client-side navigation', () => {
  it('The Iubenda cookie footer should push the event to the GTM data layer if consent has been given and the user navigates to a different page', () => {
    cy.visit('http://localhost:9000');
    cy.get("#iubenda-cs-banner").should("exist");
    cy.get(".iubenda-cs-close-btn").should("exist");

    cy.window().then(win => {
      win.dataLayer = [];
    });

    cy.get(".iubenda-cs-close-btn").click();

    cy.window().its('dataLayer').should('contain', { event: "iubenda_consent_given" });

    // reset dataLayer
    cy.window().then(win => {
      win.dataLayer = [];
    });

    cy.contains('Go to page 2').click();

    cy.window().its('dataLayer').should('contain', { event: "iubenda_consent_given" });
  })

  it('The Iubenda cookie footer should not push the event to the GTM data layer if consent has not been given and the user navigates to a different page', () => {
    cy.visit('http://localhost:9000');
    cy.get("#iubenda-cs-banner").should("exist");
    cy.get(".iubenda-cs-close-btn").should("exist");

    // reset dataLayer
    cy.window().then(win => {
      win.dataLayer = [];
    });

    cy.contains('Go to page 2').click();

    cy.once("fail", (err) => {
      expect(err.message).to.be.equal("Timed out retrying: expected [] to include { event: 'iubenda_consent_given' }");
    })
    cy.window().its('dataLayer').should('contain', { event: "iubenda_consent_given" }); // we want this to fail, hence the cy.once('fail', ...) above!
  })
})
