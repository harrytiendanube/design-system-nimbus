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
});
