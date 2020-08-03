/// <reference types="Cypress" />

context('Iubenda GTM client-side navigation', () => {
  it('The Iubenda cookie footer should push the event to the GTM data layer if consent has been given and the user navigates to a different page (onRouteUpdate)', () => {
    cy.visit('http://localhost:9000');
    cy.get("#iubenda-cs-banner").should("exist");
    cy.get(".iubenda-cs-close-btn").should("exist");
    cy.get(".page-2-link").should("exist");

    cy.window().then(win => {
      win.dataLayer = [];
    });

    cy.get(".iubenda-cs-close-btn").click();

    cy.window().its('dataLayer').should('contain', { event: "iubenda_consent_given" });

    // reset dataLayer
    cy.window().then(win => {
      win.dataLayer = [];
    });

    cy.get(".page-2-link").click();

    cy.window().its('dataLayer').should('contain', { event: "iubenda_consent_given" });
  })

  it('The Iubenda cookie footer should NOT push the event to the GTM data layer if consent has NOT been given and the user navigates to a different page (onRouteUpdate)', () => {
    cy.visit('http://localhost:9000');
    cy.get("#iubenda-cs-banner").should("exist");
    cy.get(".iubenda-cs-close-btn").should("exist");
    cy.get(".page-2-link").should("exist");

    cy.window().then(win => {
      win.dataLayer = [];
    });

    cy.get(".page-2-link").click();

    cy.window().its('dataLayer').should('not.contain', { event: "iubenda_consent_given" });
  })
})
