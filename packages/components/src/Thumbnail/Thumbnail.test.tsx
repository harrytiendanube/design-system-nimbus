/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { render, screen } from "@testing-library/react";

import Thumbnail, { InterfaceThumbnail } from "./Thumbnail";

interface InterfaceSetup {
  Component?: JSX.Element;
  props?: Omit<InterfaceThumbnail, "src" | "altText">;
}

const setup = ({ Component, props }: InterfaceSetup = {}) => {
  const { container } = render(
    Component || <Thumbnail src="mySrc" altText="myAltText" {...props} />,
  );
  return { container };
};

describe("<Thumbnail />", () => {
  it("renders defaults", () => {
    const { container } = setup();
    expect(screen.getByRole("img", { name: "myAltText" })).toBeInTheDocument();
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
    const elementImg = screen.getByRole("img", { name: "myAltText" });
    expect(elementImg).toHaveAttribute("src", "mySrc");
    expect(
      container.querySelector(".nimbus--aspect-ratio--16-9"),
    ).toHaveAttribute("style", "width: 90%;");
  });

  /*

  describe("when editMode", () => {
    it("should call selectOnClick", () => {
      const onSelectClickMock = jest.fn();
      const selectId = "mySelectId";
      setup({
        props: {
          src: "mySrc",
          altText: "myAltText",
          selectMode: true,
          selected: true,
          selectId,
          selectOnClick: onSelectClickMock,
        },
      });

      const elementCheckbox = screen.getByRole("checkbox");
      expect(elementCheckbox).toBeChecked();
      userEvent.click(elementCheckbox);
      expect(onSelectClickMock).toHaveBeenCalledWith(selectId);
    });
  });

  describe("when is loading", () => {
    it("should display spinner", () => {
      const myAltText = "myAltText";
      const { container } = setup({
        props: {
          src: "mySrc",
          altText: myAltText,
          loading: true,
        },
      });

      expect(screen.queryByRole("checkbox")).toBeNull();
      expect(
        container.querySelector(".nimbus--thumbnail-loading"),
      ).toBeInTheDocument();
      expect(screen.getByRole("img", { name: myAltText })).toBeInTheDocument();
    });
  });
  */
});
