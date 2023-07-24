import { cleanup, render } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { describe, it, afterEach, beforeEach, expect } from "vitest";
import FooterNav from "./FooterNav";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("FooterNav render", () => {
  let router;

  const navLinks = [
    {
      to: "/",
      icon: "Home",
      dataTestId: "btn-home",
    },
    {
      to: "/edit",
      icon: "Edit",
      dataTestId: "btn-edit",
    },
  ];

  beforeEach(() => {
    router = createBrowserRouter([
      {
        path: "/",
        element: (
          <>
            <p>Bienvenido al home</p>
            <FooterNav navLinks={navLinks} />
          </>
        ),
        loader: () => ({}),
      },
      {
        path: "/edit",
        element: (
          <>
            <p>Pagina de edit</p>
            <FooterNav navLinks={navLinks} />
          </>
        ),
        loader: () => ({}),
      },
    ]);
  });

  afterEach(() => {
    cleanup();
  });

  it("Sholud render correctly", async () => {
    const { findByTestId } = render(<RouterProvider router={router} />);

    const footer = await findByTestId("footer-nav");

    expect(footer).toBeInTheDocument();
  });

  it("button links should display correctly and display the correct content", async () => {
    const { findByTestId } = render(<RouterProvider router={router} />);

    const home = await findByTestId("btn-home");
    const edit = await findByTestId("btn-edit");

    expect(home).toBeInTheDocument();
    expect(edit).toBeInTheDocument();
    expect(home).toHaveTextContent("Home");
    expect(edit).toHaveTextContent("Edit");
  });

  it("when you click on a link it should show the correct page", async () => {
    const { findByTestId, container } = render(
      <RouterProvider router={router} />,
    );

    const user = userEvent.setup();

    const home = await findByTestId("btn-home");
    const edit = await findByTestId("btn-edit");

    await act(async () => {
      await user.click(edit);
    });

    expect(container).toHaveTextContent("Pagina de edit");

    await act(async () => {
      await user.click(home);
    });

    expect(container).toHaveTextContent("Bienvenido al home");
  });
});
