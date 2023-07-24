import { screen, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SelectFile from "./SelectFile";
import userEvent from "@testing-library/user-event";

describe("SelectFile component", () => {
  it("SelectFile renders correctly", () => {
    const label = "Test Label";
    const { getByText } = render(<SelectFile title={label} />);
    const labelElement = getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it("should accept attribute", () => {
    const accept = "image/png";
    const { getByTestId } = render(<SelectFile accept={accept} />);
    const input = getByTestId("input-file");
    expect(input).toHaveAttribute("accept", accept);
  });

  it("Select file", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<SelectFile onChange={onChange} />);

    const file = new File(["hello"], "hello.png", { type: "image/png" });

    const input = screen.getByTestId("label-file");

    Object.defineProperty(input, "files", {
      value: [file],
    });

    await user.upload(input, file);

    expect(input.files[0]).toEqual(file);
    expect(input.files[0].name).toBe("hello.png");
    expect(onChange).toBeCalled();
  });
});
