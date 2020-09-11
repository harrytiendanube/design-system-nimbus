import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Checkbox from ".";
import { InterfaceNameChecked } from "../common/interfaces";

const myLabel = "myLabel";
const myName = "myName";
const myChecked = true;
const myDisabled = true;

describe("<Checkbox />", () => {
  it("render", () => {
    render(
      <Checkbox
        label={myLabel}
        name={myName}
        checked={myChecked}
        disabled={myDisabled}
      />,
    );
    const element: HTMLElement = screen.getByRole("checkbox", {
      name: myLabel,
    });
    expect(element).toHaveAttribute("checked");
    expect(element).toHaveAttribute("disabled");
  });
  it('render with checked="indeterminate"', () => {
    render(
      <Checkbox
        label={myLabel}
        name={myName}
        checked="indeterminate"
        disabled={myDisabled}
      />,
    );
    const element: HTMLElement = screen.getByRole("checkbox", {
      name: myLabel,
    });
    expect(element).not.toHaveAttribute("checked");
    expect(element).toHaveClass("nimbus--checkbox indeterminate");
    expect(element).toHaveAttribute("disabled");
  });
  it("render without label", () => {
    render(
      <Checkbox name={myName} checked={myChecked} disabled={myDisabled} />,
    );
    const element: HTMLElement = screen.getByRole("checkbox", { name: "" });
    expect(element).toHaveAttribute("checked");
    expect(element).toHaveAttribute("disabled");
  });
  it("render without checked", () => {
    render(<Checkbox label={myLabel} name={myName} disabled={myDisabled} />);
    const element: HTMLElement = screen.getByRole("checkbox", {
      name: myLabel,
    });
    expect(element).not.toHaveAttribute("checked");
    expect(element).toHaveAttribute("disabled");
  });
  it("render without disabled", () => {
    render(<Checkbox label={myLabel} name={myName} checked={myChecked} />);
    const element: HTMLElement = screen.getByRole("checkbox", {
      name: myLabel,
    });
    expect(element).toHaveAttribute("checked");
    expect(element).not.toHaveAttribute("disabled");
  });
  it("calls onChange", () => {
    const handleChange = (event: InterfaceNameChecked) => {
      expect(event.checked).toBe(!myChecked);
    };
    render(
      <Checkbox
        label={myLabel}
        name={myName}
        checked={myChecked}
        onChange={handleChange}
      />,
    );
    const element: HTMLElement = screen.getByRole("checkbox", {
      name: myLabel,
    });
    userEvent.click(element);
  });
});
