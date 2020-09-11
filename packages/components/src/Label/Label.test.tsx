import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CreditCardIcon } from "@tiendanube/icons";
import Label from ".";

const myId = "myId";
const myLabel = "myLabel";
const myAppearance = "default";

describe("<Label />", () => {
  it("render as a span (without onClick)", () => {
    const { container } = render(
      <Label
        id={myId}
        icon={CreditCardIcon}
        label={myLabel}
        appearance={myAppearance}
      />,
    );
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText(myLabel)).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("render as a span (without icon, appearance, onClick)", () => {
    const myClass = "nimbus--label nimbus--label--default";
    const { container } = render(<Label id={myId} label={myLabel} />);
    expect(screen.getByRole("status")).toHaveClass(myClass);
    expect(screen.getByText(myLabel)).toBeTruthy();
    expect(container.querySelector("svg")).toBeFalsy();
  });

  it("render as a Button (with onClick)", () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Label
        id={myId}
        icon={CreditCardIcon}
        label={myLabel}
        onClick={handleClick}
        appearance={myAppearance}
      />,
    );
    expect(screen.getByRole("button", { name: myLabel })).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("calls onClick", () => {
    const handleClick = jest.fn();
    render(<Label id={myId} label={myLabel} onClick={handleClick} />);
    const element: HTMLElement = screen.getByRole("button", { name: myLabel });
    userEvent.click(element);
    expect(handleClick).toHaveBeenCalled();
  });
});
