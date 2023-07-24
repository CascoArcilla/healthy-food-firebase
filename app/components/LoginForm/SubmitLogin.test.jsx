import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { cleanup, render } from "@testing-library/react";
import SubmitLogin from "./SubmitLogin.jsx";

describe("When the SubmitLogin is rendered", () => {
  let router;

  beforeEach(() => {
    router = createBrowserRouter([
      {
        path: "/",
        element: <SubmitLogin isSubmit={false}></SubmitLogin>,
        loader: () => ({}),
      },
    ]);
  });

  afterEach(() => {
    cleanup();
  });

  it('Then a button "Ingresar" should be show', async () => {
    const view = render(<RouterProvider router={router} />);
    const btnIn = await view.findByTestId("sing-in");
    const btnTo = await view.findByTestId("to-register");

    expect(btnIn).toBeInTheDocument();
    expect(btnTo).toBeInTheDocument();
  });
});
