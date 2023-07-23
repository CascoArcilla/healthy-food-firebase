describe('When the user login', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.wait(300);
  });

  it('Then the list of post should be shown', () => {
    cy.url().should('include', '/login');    
    cy.get('[data-cy="login-form"]').should('be.visible');
    cy.get('[data-cy="email-field"]').type('user@example.com');
    cy.get('[data-cy="password-field"]').type('password');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should("equal", "http://localhost:3000/");
  });
})
