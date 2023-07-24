import { describe, it, beforeEach, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordLogin from "./PasswordLogin.jsx";

describe("When PasswordLogin is rendered", () => {
  let component;

  beforeEach(() => {
    component = render(<PasswordLogin></PasswordLogin>);
  });

  it("Then a label with the text Contraseña should be show", async () => {
    const label = await component.getByText("Contraseña");
    expect(label).toBeInTheDocument();
  });

  it("Then a key-shaped icon should be show", async () => {
    const icon = await component.getByTestId("icon-key");
    expect(icon).toBeInTheDocument();
  });

  it("Then a TextField type password should be show", async () => {
    const pass = await component.getByPlaceholderText("Tu contraseña");
    expect(pass).toBeInTheDocument();
  });

  it("User write a password and inpurt value change", async () => {
    const password = await component.getByPlaceholderText("Tu contraseña");
    await userEvent.type(password, "password1");
    expect(password.value).toEqual("password1");
  });
});
