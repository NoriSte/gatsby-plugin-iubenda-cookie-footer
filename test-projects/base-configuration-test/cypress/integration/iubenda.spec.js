/// <reference types="Cypress" />

context("Iubenda", () => {
  it("The Iubenda cookie footer should appear", () => {
    cy.visit("/")
    cy.get("#iubenda-cs-banner").should("exist")
    cy.get(".iubenda-cs-close-btn").should("exist")
  })
})
