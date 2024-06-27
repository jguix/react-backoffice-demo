/// <reference types="cypress" />
describe('login page', () => {
  it('displays login page by default', () => {
    cy.visit('http://localhost:5173/#/');

    cy.url().should('equal', 'http://localhost:5173/#/login');
    cy.get('[data-testid="login-title"]').should('have.text', 'Start Session');
  });

  it('logs in the app', () => {
    cy.visit('http://localhost:5173/#/login');

    cy.get('[data-testid="login-username-input"]').type('test@example.com');
    cy.get('[data-testid="login-password-input"]').type('123456');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('equal', 'http://localhost:5173/#/customers');
  });
});
