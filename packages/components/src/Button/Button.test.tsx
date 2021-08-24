import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ArrowRightIcon } from "@tiendanube/icons";

import Button from ".";

const myIconPosition = "start";
const myIconSize = "small";
const myAppearance = "default";
const myText = "myText";
const myAriaLabel = "myAriaLabel";

describe("<Button/>", () => {
  it("renders", () => {
    const { container } = render(
      <Button
        appearance={myAppearance}
        icon={ArrowRightIcon}
        iconPosition={myIconPosition}
        iconSize={myIconSize}
        ariaLabel={myAriaLabel}
        onClick={jest.fn()}
      >
        {myText}
      </Button>,
    );
    expect(screen.getByRole("button", { name: myAriaLabel })).toHaveClass(
      `nimbus--button nimbus--button--${myAppearance}`,
    );
    expect(container.querySelector("i")).toHaveClass(
      `nimbus--button__icon--${myIconPosition}`,
    );
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("renders without optional parameters", () => {
    const { container } = render(<Button>{myText}</Button>);
    expect(screen.getByRole("button", { name: myText })).toHaveClass(
      `nimbus--button nimbus--button--${myAppearance}`,
    );
    expect(container.querySelector("i")).toBeNull();
    expect(container.querySelector("svg")).toBeNull();
  });

  it("renders disabled", () => {
    render(
      <Button disabled onClick={jest.fn()}>
        {myText}
      </Button>,
    );
    expect(screen.getByRole("button", { name: myText })).toHaveProperty(
      "disabled",
      true,
    );
  });

  it("renders with end position icon", () => {
    const { container } = render(
      <Button icon={ArrowRightIcon} iconPosition="end" onClick={jest.fn()}>
        {myText}
      </Button>,
    );
    expect(container.querySelector("i")).toHaveClass(
      `nimbus--button__icon--end`,
    );
  });

  it("renders with spinner", () => {
    const { container } = render(
      <Button
        icon={ArrowRightIcon}
        iconPosition="end"
        spinner
        onClick={jest.fn()}
      >
        {myText}
      </Button>,
    );
    expect(screen.getByRole("button", { name: myText }));
    expect(container.querySelector("svg")).toHaveClass("nimbus--spinner");
    expect(container.querySelector("i")).toBeNull();
  });

  it("render skeleton", () => {
    const { container } = render(<Button.Skeleton />);
    expect(container.querySelector(".nimbus--button-skeleton")).toBeTruthy();
  });

  it("calls onClick", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>{myText}</Button>);
    userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("render with different type", () => {
    render(<Button type="submit">{myText}</Button>);
    const button = screen.getByRole("button", { name: myText });
    expect(button).not.toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
