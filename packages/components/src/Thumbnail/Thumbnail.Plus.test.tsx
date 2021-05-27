/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Thumbnail, { InterfaceThumbnailPlus } from "./Thumbnail";

interface InterfaceSetup {
  Component?: JSX.Element;
  props?: Omit<
    InterfaceThumbnailPlus,
    "onClick" | "src" | "altText" | "ariaLabel" | "number"
  >;
}

const setup = ({ Component, props }: InterfaceSetup = {}) => {
  const handleOnClick = jest.fn();
  const { container } = render(
    Component || (
      <Thumbnail.Plus
        onClick={handleOnClick}
        src="mySrc"
        altText="myAltText"
        ariaLabel="myAriaLabel"
        number={5}
        {...props}
      />
    ),
  );
  const elementButton = screen.getByRole("button", { name: "myAriaLabel" });
  const elementImg = screen.getByRole("img", { name: "myAltText" });
  const elementP = screen.getByText("+5");

  return { container, elementButton, handleOnClick, elementImg, elementP };
};

describe("<Thumbnail.Add />", () => {
  it("renders defaults", () => {
    const { container, elementButton, elementImg, elementP } = setup();
    expect(elementButton).toBeInTheDocument();
    expect(elementImg).toBeInTheDocument();
    expect(elementP).toBeInTheDocument();
    expect(
      container.querySelector(".nimbus--aspect-ratio--1-1"),
    ).toHaveAttribute("style", "width: 100%;");
  });

  it("renders optional parameters", () => {
    const { container } = setup({
      props: {
        aspectRatio: "16-9",
        width: "90%",
      },
    });
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
