import { cleanup, render } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import TextField from "./TextField";

describe("When TextField is rendered", () => {

  afterEach(() => {
    cleanup();
  });

  it("Then it should render correctly", () => {
    const view = render(<TextField name="email" type="email" />);
    const input: HTMLElement = view.getByTestId("TextField");
    expect(input).toBeInTheDocument();
  });

  it("Then it should render correctly with label", () => {
    const view = render(<TextField name="email" type="email" label="Nombre" />);
    const label = view.getByLabelText("Nombre");

    expect(label).toBeInTheDocument();
  });

  it("Then it should not allow submit with an empty required field", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const view = render(
      <form onSubmit={spy}>
        <TextField
          label="Nombre"
          name="nombre"
          type="text"
          required
          onChange={spy}
        />
        <button type="submit">Send</button>
      </form>
    );

    const btn = view.getByRole("button");
    await user.click(btn);

    expect(spy).not.toHaveBeenCalled();
  });

  it("Then it should submit with a required value", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const view = render(
      <form onSubmit={spy}>
        <TextField
          label="Nombre"
          name="nombre"
          type="text"
          required
          onChange={spy}
        />
        <button type="submit">Send</button>
      </form>
    );

    const field = view.getByLabelText("Nombre");
    await user.type(field, "Jaime");

    expect(spy).toHaveBeenCalled();
  });

  it("Then it should not allow submit when value doesn't match pattern attribute", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const view = render(
      <form onSubmit={spy}>
        <TextField
          label="Nombre"
          name="nombre"
          type="text"
          required
          pattern="[a-zA-Z]{3,50}"
          onChange={spy}
        />
        <button type="submit">Send</button>
      </form>
    );

    const btn = view.getByRole("button");
    await user.click(btn);

    expect(spy).not.toHaveBeenCalled();
  });

  it("Then it should  submit when value match pattern attribute", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    const view = render(
      <form onSubmit={spy}>
        <TextField
          label="Nombre"
          name="nombre"
          type="text"
          required
          pattern="[a-zA-Z]{3,50}"
          onChange={spy}
        />
        <button type="submit">Send</button>
      </form>
    );

    const field = view.getByLabelText("Nombre");
    await user.type(field, 'Jaime');

    expect(spy).toHaveBeenCalled();
  });
});
