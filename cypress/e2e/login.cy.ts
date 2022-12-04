describe('login page', () => {
  it('logs in the app', () => {
    cy.visit('http://localhost:3000/#/login');

    cy.get('[data-testid="login-username-input"]').type('test@example.com');
    cy.get('[data-testid="login-password-input"]').type('123456');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('equal', 'http://localhost:3000/#/customers');
  });
});
