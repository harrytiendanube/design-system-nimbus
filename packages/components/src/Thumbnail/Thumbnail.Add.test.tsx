/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Thumbnail, { InterfaceThumbnailAdd } from "./Thumbnail";

interface InterfaceSetup {
  Component?: JSX.Element;
  props?: Omit<
    InterfaceThumbnailAdd,
    "onClick" | "src" | "altText" | "ariaLabel"
  >;
}

const setup = ({ Component, props }: InterfaceSetup = {}) => {
  const handleOnClick = jest.fn();
  const { container } = render(
    Component || (
      <Thumbnail.Add
        onClick={handleOnClick}
        src="mySrc"
        altText="myAltText"
        ariaLabel="myAriaLabel"
        {...props}
      />
    ),
  );
  const elementButton = screen.getByRole("button", { name: "myAriaLabel" });

  return { container, elementButton, handleOnClick };
};

describe("<Thumbnail.Add />", () => {
  it("renders defaults", () => {
    const { container, elementButton } = setup();
    expect(elementButton).toBeInTheDocument();
    expect(
      container.querySelector(".nimbus--aspect-ratio--1-1"),
    ).toHaveAttribute("style", "width: 100%;");
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-label",
      "PlusCircle",
    );
  });

  it("renders optional parameters", () => {
    const { container, elementButton } = setup({
      props: {
        aspectRatio: "16-9",
        width: "90%",
        disabled: true,
      },
    });
    expect(elementButton).toHaveAttribute("disabled");
    expect(
      container.querySelector(".nimbus--aspect-ratio--16-9"),
    ).toHaveAttribute("style", "width: 90%;");
  });

  describe("when is button is clicked", () => {
    it("should call onClick", () => {
      const { elementButton, handleOnClick } = setup({});
      userEvent.click(elementButton);
      expect(handleOnClick).toHaveBeenCalled();
    });
  });
});
