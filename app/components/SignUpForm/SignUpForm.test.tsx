import { cleanup, render } from "@testing-library/react";
import { expect } from "vitest";
import SignUpForm from "./SignUpForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Also you can use createMemoryRouter
import type { Router } from "@remix-run/router";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("When SignUpForm is rendered", () => {
  let router: Router;
  beforeEach(() => {
    router = createBrowserRouter([
      {
        path: "/",
        element: <SignUpForm></SignUpForm>,
        loader: () => ({}),
      },
    ]);
  });

  afterEach(() => {
    cleanup();
  });

  it("Then submit button should exist", async () => {
    const formView = render(<RouterProvider router={router} />);

    const btn = await formView.findByRole("button", { name: /registrarme/i });

    expect(btn).toBeInTheDocument();
  });

  it("Then repeated password should match the password", async () => {
    const formView = render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const password = "Aeiou1234";
    const passwordField = await formView.findByLabelText(/^\*?contraseña$/i);
    const passwordAgainField = await formView.findByLabelText(
      /repetir contraseña$/i,
    );

    await act(async () => {
      await user.type(passwordField, password);
      await user.type(passwordAgainField, password);
    });

    const error = formView.queryByText("Las contraseñas deben coincidir");
    expect(error).not.toBeInTheDocument();
    expect(passwordField).toHaveValue(password);
    expect(passwordAgainField).toHaveValue(password);
  });

  it("Then an error because passwords are not matching should be shown", async () => {
    const formView = render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const password = "Aeiou1234";
    const passwordField = await formView.findByLabelText(/^\*?contraseña$/i);
    const passwordAgainField = await formView.findByLabelText(
      /repetir contraseña$/i,
    );

    await act(async () => {
      await user.type(passwordField, password);
      await user.type(passwordAgainField, "Aei12345");
    });

    const error = formView.queryByText("Las contraseñas deben coincidir");
    expect(error).toBeInTheDocument();
    expect(passwordField).toHaveValue(password);
    expect(passwordAgainField).not.toHaveValue(password);
  });
});
