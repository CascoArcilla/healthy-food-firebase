import { describe, beforeEach, it, expect } from "vitest";
import { render } from "@testing-library/react";
import DescriptionLogin from "./DescriptionLogin.jsx";

describe("When the component DescriptionLogin is rendered", () => {
  let component;

  beforeEach(() => {
    component = render(<DescriptionLogin></DescriptionLogin>);
  });

  it("Then a text how description should be show", async () => {
    const text = await component.getByText("O cuenta healty food");
    expect(text).toBeInTheDocument();
  });
});
