describe('logout link', () => {
  const login = () => {
    cy.visit('http://localhost:5173/#/login');

    cy.get('[data-testid="login-username-input"]').type('test@example.com');
    cy.get('[data-testid="login-password-input"]').type('123456');
    cy.get('[data-testid="login-button"]').click();
  };

  beforeEach(() => {
    login();
  });

  it('logs out the user to the login page', () => {
    cy.visit('http://localhost:5173/#/');

    cy.get('[data-testid="header-navigation-logout"]').click();

    cy.get('[data-testid="login-title"]').should('have.text', 'Start Session');
  });
});
