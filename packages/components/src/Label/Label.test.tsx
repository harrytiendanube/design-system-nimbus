/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CreditCardIcon } from "@tiendanube/icons";
import Label from ".";

const LabelComponent = (props: any) => (
  <Label id="myId" label="myLabel" {...props} />
);

const setup = ({ Component, props }: any) => {
  const { container } = render(Component || <LabelComponent {...props} />);
  return { container };
};

describe("<Label />", () => {
  it("render as a span (without onClick)", () => {
    const { container } = setup({
      props: { icon: CreditCardIcon, appearance: "default" },
    });
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText("myLabel")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("render as a span (without icon, appearance, onClick)", () => {
    const myClass = "nimbus--label nimbus--label--default";
    const { container } = setup({ props: {} });
    expect(screen.getByRole("status")).toHaveClass(myClass);
    expect(screen.getByText("myLabel")).toBeTruthy();
    expect(container.querySelector("svg")).toBeFalsy();
  });

  it("render as a span with colorTag", () => {
    const myClass = "nimbus--label nimbus--label--default";
    const { container } = setup({ props: { colorTag: "#00000" } });
    expect(screen.getByRole("status")).toHaveClass(myClass);
    expect(screen.getByText("myLabel")).toBeTruthy();
    expect(container.querySelector("svg")).toBeFalsy();
    expect(
      container.querySelector("span.nimbus--label__color-tag"),
    ).toBeTruthy();
  });

  it("render as a Button (with onClick)", () => {
    const handleClick = jest.fn();
    const { container } = setup({
      props: {
        icon: CreditCardIcon,
        onClick: handleClick,
        appearance: "default",
      },
    });
    expect(screen.getByRole("button", { name: "myLabel" })).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("render as a Button with colorTag", () => {
    const handleClick = jest.fn();
    const { container } = setup({
      props: {
        onClick: handleClick,
        colorTag: "#00000",
      },
    });
    expect(screen.getByRole("button", { name: "myLabel" })).toBeTruthy();
    expect(
      container.querySelector("span.nimbus--label__color-tag"),
    ).toBeTruthy();
  });

  it("should throw an error for parameter incompatibility (icon, colorTag) ", () => {
    try {
      setup({
        props: {
          icon: CreditCardIcon,
          colorTag: "#00000",
        },
      });
    } catch (error) {
      expect(error.message).toEqual(
        "You can not use parameters 'icon' and 'colorTag' simultaneously",
      );
    }
  });

  it("should throw an error for parameter incompatibility (appearance, colorTag)", () => {
    try {
      setup({
        props: {
          appearance: "primary",
          colorTag: "#00000",
        },
      });
    } catch (error) {
      expect(error.message).toEqual(
        "You can not use parameters 'appearance' and 'colorTag' simultaneously",
      );
    }
  });

  it("render skeleton", () => {
    const { container } = render(<Label.Skeleton />);
    expect(container.querySelector("span")).toHaveClass(
      "nimbus--label-skeleton",
    );
  });

  it("calls onClick", () => {
    const handleClick = jest.fn();
    setup({
      props: {
        onClick: handleClick,
      },
    });
    const element: HTMLElement = screen.getByRole("button", {
      name: "myLabel",
    });
    userEvent.click(element);
    expect(handleClick).toHaveBeenCalled();
  });
});
