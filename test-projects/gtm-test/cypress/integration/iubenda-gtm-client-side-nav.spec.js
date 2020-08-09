/// <reference types="Cypress" />

const containConsentGivenEvents = num => dataLayer => {
  expect(dataLayer.filter(member => member.event === "iubenda_consent_given").length).to.be.equal(num);
}

context('Iubenda GTM client-side navigation', () => {
  it('The Iubenda cookie footer should push the event to the GTM data layer if consent has been given and the user navigates to a different page', () => {
    cy.visit('/');
    cy.get("#iubenda-cs-banner").should("exist");
    cy.get(".iubenda-cs-close-btn").should("exist");

    cy.window().then(win => {
      win.dataLayer = [];
    });

    cy.get(".iubenda-cs-close-btn").click();
    cy.window().its('dataLayer').should(containConsentGivenEvents(1));

    cy.contains('Go to page 2').click();
    cy.window().its('dataLayer').should(containConsentGivenEvents(2));

    cy.contains('Go back to the homepage').click();
    cy.window().its('dataLayer').should(containConsentGivenEvents(3));
  })

  it('The Iubenda cookie footer should not push the event to the GTM data layer if consent has not been given and the user navigates to a different page', () => {
    cy.visit('/');
    cy.get("#iubenda-cs-banner").should("exist");
    cy.get(".iubenda-cs-close-btn").should("exist");

    cy.contains('Go to page 2').click();

    // the plugin creates the  `dataLayer` global variable at first event
    cy.window().its('dataLayer').should('be.undefined');
  })
})
