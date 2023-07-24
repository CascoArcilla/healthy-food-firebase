describe("when an anonymous user enters the application", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("then you can only navigate to the home, login and join", () => {
    cy.get('[data-cy="nav-publish"]').click();
    cy.url().should("include", "/login");

    cy.get('[data-cy="nav-join"]').click();
    cy.url().should("include", "/join");

    cy.get('[data-cy="nav-home"]').click();
    cy.url().should("include", "/");
  });
});
