/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Thumbnail, { InterfaceThumbnailSelect } from "./Thumbnail";

interface InterfaceSetup {
  Component?: JSX.Element;
  props?: Omit<
    InterfaceThumbnailSelect,
    "id" | "selected" | "onSelect" | "src" | "altText"
  >;
}

const setup = ({ Component, props }: InterfaceSetup = {}) => {
  const handleOnSelect = jest.fn();
  const { container } = render(
    Component || (
      <Thumbnail.Select
        selected
        id="myId"
        onSelect={handleOnSelect}
        src="mySrc"
        altText="myAltText"
        {...props}
      />
    ),
  );
  const elementCheckbox = screen.getByRole("checkbox");
  const elementImg = screen.getByRole("img", { name: "myAltText" });
  return { container, elementImg, elementCheckbox, handleOnSelect };
};

describe("<Thumbnail.Select />", () => {
  it("renders defaults", () => {
    const { container, elementImg, elementCheckbox } = setup();
    expect(elementCheckbox).toBeInTheDocument();
    expect(elementImg).toBeInTheDocument();
    expect(
      container.querySelector(".nimbus--aspect-ratio--1-1"),
    ).toHaveAttribute("style", "width: 100%;");
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-label",
      "Check",
    );
  });

  it("renders optional parameters", () => {
    const { container, elementImg } = setup({
      props: {
        aspectRatio: "16-9",
        width: "90%",
      },
    });
    expect(elementImg).toHaveAttribute("src", "mySrc");
    expect(
      container.querySelector(".nimbus--aspect-ratio--16-9"),
    ).toHaveAttribute("style", "width: 90%;");
  });

  it("should call selectOnClick", () => {
    const { elementCheckbox, handleOnSelect } = setup();
    expect(elementCheckbox).toBeChecked();
    userEvent.click(elementCheckbox);
    expect(handleOnSelect).toHaveBeenCalledWith("myId");
  });
});
