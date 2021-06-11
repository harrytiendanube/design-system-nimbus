/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Thumbnail, { InterfaceThumbnailError } from "./Thumbnail";

interface InterfaceSetup {
  Component?: JSX.Element;
  props?: Omit<
    InterfaceThumbnailError,
    "onClick" | "src" | "altText" | "ariaLabel" | "number"
  >;
}

const setup = ({ Component, props }: InterfaceSetup = {}) => {
  const handleOnClick = jest.fn();
  const { container } = render(
    Component || (
      <Thumbnail.Error
        onClick={handleOnClick}
        src="mySrc"
        altText="myAltText"
        ariaLabel="myAriaLabel"
        {...props}
      />
    ),
  );
  const elementButton = screen.getByRole("button", { name: "myAriaLabel" });
  const elementImg = screen.getByRole("img", { name: "myAltText" });

  return { container, elementButton, handleOnClick, elementImg };
};

describe("<Thumbnail.Error />", () => {
  it("renders defaults", () => {
    const { container, elementButton, elementImg } = setup();
    expect(elementButton).toBeInTheDocument();
    expect(elementImg).toBeInTheDocument();
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
