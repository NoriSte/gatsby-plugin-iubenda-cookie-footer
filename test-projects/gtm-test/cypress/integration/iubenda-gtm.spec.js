/// <reference types="Cypress" />

context("Iubenda GTM", () => {
  it("The Iubenda cookie footer should push the event to the GTM data layer", () => {
    cy.visit("/")
    cy.get("#iubenda-cs-banner").should("exist")
    cy.get(".iubenda-cs-close-btn").should("exist")

    cy.window().then((win) => {
      win.dataLayer = []
    })

    cy.get(".iubenda-cs-close-btn").click()

    cy.window()
      .its("dataLayer")
      .its("0")
      .should("deep.equal", { event: "iubenda_consent_given" })
  })

  it("The Iubenda cookie footer should push the event to the GTM data layer if consent has been given and the user navigates to a different page", () => {
    cy.visit("/")
    cy.get("#iubenda-cs-banner").should("exist")
    cy.get(".iubenda-cs-close-btn").should("exist")

    cy.window().then((win) => {
      win.dataLayer = []
    })

    cy.get(".iubenda-cs-close-btn").click()
    cy.window().its("dataLayer").should(expectContainConsentGivenEvents(1))

    cy.contains("Go to page 2").click()
    cy.window().its("dataLayer").should(expectContainConsentGivenEvents(2))

    cy.contains("Go back to the homepage").click()
    cy.window().its("dataLayer").should(expectContainConsentGivenEvents(3))
  })

  it("The Iubenda cookie footer should not push the event to the GTM data layer if consent has not been given and the user navigates to a different page", () => {
    cy.visit("/")
    cy.get("#iubenda-cs-banner").should("exist")
    cy.get(".iubenda-cs-close-btn").should("exist")

    cy.contains("Go to page 2").click()

    // the plugin creates the  `dataLayer` global variable at first event
    cy.window().its("dataLayer").should("be.undefined")
  })
})

const expectContainConsentGivenEvents = (num) => (dataLayer) => {
  expect(
    dataLayer.filter((member) => member.event === "iubenda_consent_given")
      .length
  ).to.be.equal(num)
}
