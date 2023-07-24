import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { cleanup, render } from "@testing-library/react";
import FormLogin from "./FormLogin";

describe("When the form render", () => {
  let router;
  let actionData = {};

  beforeEach(() => {
    router = createBrowserRouter([
      {
        path: "/",
        element: <FormLogin actionData={actionData}></FormLogin>,
        loader: () => ({}),
      },
    ]);
  });

  afterEach(() => {
    cleanup();
  });

  it("Then a form with two inputs should rendered", async () => {
    const formLogin = render(<RouterProvider router={router} />);
    const form = await formLogin.findByTestId("form-login");
    const mailInput = await formLogin.findByPlaceholderText(
      "tu@pensemosweb.com",
    );
    const passInput = await formLogin.findByPlaceholderText("Tu contraseña");

    expect(form).toBeInTheDocument();
    expect(mailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
  });

  it("If there is an error a message should be displayed", async () => {
    actionData.error = "Mail not found";
    const formLogin = render(<RouterProvider router={router} />);
    const error = await formLogin.findByTestId("error-login");

    expect(error).toBeInTheDocument();
  });
});
