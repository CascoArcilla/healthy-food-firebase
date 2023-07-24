import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import PublishForm from "./PublishForm";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

describe("When PublishForm is rendered", () => {
  let router;

  beforeEach(() => {
    router = createBrowserRouter([
      {
        path: "/",
        element: <PublishForm></PublishForm>,
        loader: () => ({}),
      },
    ]);
  });

  afterEach(() => {
    cleanup();
  });

  it("Then a welcome should shown", async () => {
    const view = render(<RouterProvider router={router} />);

    const welcome = await view.findByText(
      "Bienvenido, publica tu nueva comida sana",
    );

    expect(welcome).toBeInTheDocument();
  });

  it("Then publish button should exist", async () => {
    const view = render(<RouterProvider router={router} />);

    const btn = await view.findByText(/Publicar/i);

    expect(btn).toBeInTheDocument();
  });

  it("Then the title, price, description and file fields should be displayed", async () => {
    const view = render(<RouterProvider router={router} />);

    const titleField = await view.findByTestId("title-publish");
    const priceField = await view.findByTestId("price-publish");
    const imageInput = await view.findByTestId("image-publish");
    const descField = await view.findByTestId("description-publish");

    expect(titleField).toBeInTheDocument();
    expect(priceField).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(descField).toBeInTheDocument();
  });
});
