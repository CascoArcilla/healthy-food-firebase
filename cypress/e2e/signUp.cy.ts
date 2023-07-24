import { faker } from "@faker-js/faker";

describe("When anonymous user wants to sign up with name, email and password", () => {
  beforeEach(() => {
    cy.visit("/join");
  });

  it("Then sign up should be successful", () => {
    const name = faker.person.fullName();
    const userName = faker.internet.userName();
    const password = faker.internet.password();

    cy.get('[data-cy="signUp-form"]').should("exist");
    cy.get('[name="name"]').type(name);
    cy.get('[name="email"]').type(`${userName}@fake.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[name="passwordAgain"]').type(password);

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");
    cy.get('[data-cy="btn-logout"]').should("exist");
  });
});
