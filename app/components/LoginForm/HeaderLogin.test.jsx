import { describe, beforeEach, it, expect } from "vitest";
import { render } from "@testing-library/react";
import HeaderLogin from "./HeaderLogin.jsx";

describe("When the the component HeaderLogin is rendered", () => {
  let component;

  beforeEach(() => {
    component = render(<HeaderLogin></HeaderLogin>);
  });

  it('Then a header "inicio sesion" should be show', async () => {
    const title = await component.getByRole("heading");
    expect(title).toBeInTheDocument();
  });

  it("Then a description should be show", async () => {
    const description = await component.getByTestId("description");
    expect(description).toBeInTheDocument();
  });
});
