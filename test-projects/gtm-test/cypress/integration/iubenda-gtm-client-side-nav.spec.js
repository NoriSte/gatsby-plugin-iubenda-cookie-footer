/// <reference types="Cypress" />

const containConsentGivenEvents = num => dataLayer => {
  expect(dataLayer).contains({ event: "iubenda_consent_given" });
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

    cy.window().its('dataLayer').should('contain', { event: "iubenda_consent_given" });

    // reset dataLayer
    cy.window().then(win => {
      win.dataLayer = [];
    });

    cy.contains('Go to page 2').click();
    cy.window().its('dataLayer').should(containConsentGivenEvents(1));

    cy.contains('Go back to the homepage').click();
    cy.window().its('dataLayer').should(containConsentGivenEvents(2));
  })

  it('The Iubenda cookie footer should not push the event to the GTM data layer if consent has not been given and the user navigates to a different page', () => {
    cy.visit('/');
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
