describe("When anonymous user wants to publish a healthy food", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-cy="nav-publish"]').click();
  });

  it.skip("Then a login form should be shown", () => {
    cy.url().should("include", "/login");
    cy.get('[data-cy="login-form"]').should("be.visible");
  });
});

describe("When a register user wants to create a post of healthy food", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.wait(1000);

    cy.url().should("include", "/login");
    cy.get('[data-cy="login-form"]').should("be.visible");
    cy.get('[data-cy="email-field"]').type("user@example.com");
    cy.get('[data-cy="password-field"]').type("password");
    cy.get('[data-cy="login-button"]').click();
    cy.url().should("equal", "http://localhost:3000/");

    cy.get('[data-cy="nav-publish"]').click();
  });

  it("Then a post form should be shown", () => {
    cy.get('[data-cy="publish-form"]').should("exist");
  });

  it("When the user enters the title, description, price and image", () => {
    cy.get('[data-cy="title-publish"]').type("Ensalada de verduras");
    cy.get('[data-cy="price-publish"]').type("35.00");
    cy.fixture("food.jpg", null).as("food");
    cy.get('[data-cy="image-publish"]').selectFile("@food", { force: true });
    cy.get('[data-cy="description-publish"]').type(
      "Ensalada de verduras con papas fritas",
    );

    cy.get('[data-cy="publish"]').click();
  });
});
