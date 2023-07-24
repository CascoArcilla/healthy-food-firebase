import { describe, it, beforeEach, expect } from "vitest";
import { render } from "@testing-library/react";
import SingInGoogleLogin from "./SingInGoogleLogin.jsx";

describe("When the SingInGoogleLogin is rendered", () => {
  let component;

  beforeEach(() => {
    component = render(<SingInGoogleLogin></SingInGoogleLogin>);
  });

  it("Then a text Ingresar con should be show", async () => {
    const text = component.getByText("Ingresar con");
    expect(text).toBeInTheDocument();
  });

  it("Then a button with text Google should be show", async () => {
    const google = await component.getByText("Google");
    expect(google).toBeInTheDocument();
  });

  it("Then a icon google should be show", async () => {
    const icon = await component.getByTestId("icon-google");
    expect(icon).toBeInTheDocument();
  });
});
