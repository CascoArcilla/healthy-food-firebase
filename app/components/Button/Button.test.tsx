import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import Button from "./Button";

describe("Button component", () => {
  it("should render component without crashing when no props are provided", () => {
    render(<Button />);
  });

  it("Then the component should be shown with default props", () => {
    const { getByTestId } = render(<Button />);
    const button = getByTestId("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toHaveAttribute("id");
    expect(button).not.toBeDisabled();
  });

  it("Then if have a children this should be showm", () => {
    const { getByTestId } = render(
      <Button>
        <span>I am a children</span>
      </Button>,
    );
    const button = getByTestId("button");

    expect(button).toHaveTextContent("I am a children");
  });

  it("onClick prop", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    const { getByTestId } = render(<Button onClick={onClick} />);
    const button = getByTestId("button");

    await user.click(button);

    expect(onClick).toBeCalled();
  });

  it("Then when props exist the button should be shown with this props", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    const { getByTestId } = render(
      <Button
        size="sm"
        disabled
        className="test-class"
        text="test-text"
        type="reset"
        onClick={onClick}
      >
        <span> children test</span>
      </Button>,
    );

    const button = getByTestId("button");

    await user.click(button);

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("type", "reset");
    expect(button).toHaveTextContent("test-text children test");
    expect(onClick).not.toBeCalled();
  });
});
