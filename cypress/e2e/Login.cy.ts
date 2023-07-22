describe('When a user wants to login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="nav-login"]').should('be.visible');
    cy.wait(300);
    cy.get('[data-cy="nav-login"]').click();
  });

  it('Then the list of post should be shown', async () => {
    cy.url().should('include', '/login');
    cy.get('[data-cy="login-form"]').should('be.visible');
    cy.get('[data-cy="email-field"]').type('user@example.com');
    cy.get('[data-cy="password-field"]').type('password');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('equal', 'http://localhost:3000/');
  });
})
