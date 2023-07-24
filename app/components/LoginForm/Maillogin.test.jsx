import { describe, it, beforeEach, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MailLogin from "./MailLogin.jsx";

describe("When MailLogin is rendered", () => {
  let component;

  beforeEach(() => {
    component = render(<MailLogin></MailLogin>);
  });

  it("Then a label with the text Correo should be show", async () => {
    const label = await component.getByText("Correo");
    expect(label).toBeInTheDocument();
  });

  it("Then a mail-shaped icon should be show", async () => {
    const icon = await component.getByTestId("icon-mail");
    expect(icon).toBeInTheDocument();
  });

  it("Then a TextField type mail should be show", async () => {
    const mail = await component.getByPlaceholderText("tu@pensemosweb.com");
    expect(mail).toBeInTheDocument();
  });

  it("User write a mail and input value change", async () => {
    const inputMail = await component.getByPlaceholderText(
      "tu@pensemosweb.com",
    );
    await userEvent.type(inputMail, "user_example@correo.com");
    expect(inputMail.value).equal("user_example@correo.com");
  });
});
