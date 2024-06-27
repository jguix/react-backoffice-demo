/// <reference types="cypress" />
describe('products page', () => {
  const login = () => {
    cy.visit('http://localhost:5173/#/login');

    cy.get('[data-testid="login-username-input"]').type('test@example.com');
    cy.get('[data-testid="login-password-input"]').type('123456');
    cy.get('[data-testid="login-button"]').click();
  };

  beforeEach(() => {
    login();
  });

  it('loads several rows of products', () => {
    cy.visit('http://localhost:5173/#/products');

    cy.get('[data-testid="product-list-item"]').should('have.length', 13);
  });

  it('loads more products on scroll down', () => {
    cy.visit('http://localhost:5173/#/products');
    cy.scrollTo('bottom');

    cy.get('[data-testid="product-list-item"]').should('have.length', 26);
  });
});
