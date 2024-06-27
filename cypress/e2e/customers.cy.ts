/// <reference types="cypress" />
describe('customers page', () => {
  const login = () => {
    cy.visit('http://localhost:5173/#/login');

    cy.get('[data-testid="login-username-input"]').type('test@example.com');
    cy.get('[data-testid="login-password-input"]').type('123456');
    cy.get('[data-testid="login-button"]').click();
  };

  beforeEach(() => {
    login();
  });

  it('displays customers by default after logging in', () => {
    cy.visit('http://localhost:5173/#/');

    cy.url().should('equal', 'http://localhost:5173/#/customers');
    cy.get('[data-testid="hero-title"]').should('have.text', 'Customers');
  });

  it('loads several rows of customers', () => {
    cy.visit('http://localhost:5173/#/customers');

    cy.get('[data-testid="customer-list-item"]').should('have.length', 10);
  });

  it('loads more customers on scroll down', () => {
    cy.visit('http://localhost:5173/#/customers');
    cy.scrollTo('bottom');

    cy.get('[data-testid="customer-list-item"]').should('have.length', 20);
  });
});
