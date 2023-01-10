/// <reference types="cypress" />
// @ts-check
// import "../../support"
// import { LoginResultMsg } from "../../../pages/login/index.page"

describe("Login", () => {
  beforeEach(() => {
    cy.visit("cicd");
  });

  it('Should present valid state if form is valid', () => {
    cy.visit("cicd");
  })

  // it('Should present valid state if form is valid', () => {
  //   cy.getByTestId('submit-button').click()
  //   cy.getByTestId('email-input').focus().type("valid@email.dev")
  //   cy.getByTestId('input-error-msg').should("exist");
  // })

  // it('Should present valid state if email is not valid on first try', () => {
  //   cy.getByTestId('email-input').focus().type("invalid#email.dev");
  //   cy.getByTestId('input-error-msg').should("not.exist");
  // })

  // it('Should present invalid state if email is not valid on next try', () => {
  //   cy.getByTestId('submit-button').click()
  //   cy.getByTestId('email-input').focus().type("invalid#email.dev");
  //   cy.getByTestId('input-error-msg').should("exist");
  // })

  // it('Should present valid state if form is valid', () => {
  //   cy.getByTestId('email-input').focus().type("invalid@email")
  //   cy.getByTestId('submit-button').click()
  //   cy.getByTestId('email-input').focus().clear()
  //   cy.getByTestId('email-input').focus().type("other.invalid#email.dev")
  //   cy.getByTestId('submit-button').click()
  //   cy.getByTestId('input-error-msg').should("exist");
  // })
});
