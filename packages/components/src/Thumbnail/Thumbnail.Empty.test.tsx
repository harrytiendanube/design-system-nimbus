/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { render } from "@testing-library/react";
import { CameraIcon } from "@tiendanube/icons";

import Thumbnail, { InterfaceThumbnailEmpty } from "./Thumbnail";

interface InterfaceSetup {
  Component?: JSX.Element;
  props?: Omit<InterfaceThumbnailEmpty, "placeholderIcon">;
}

const setup = ({ Component, props }: InterfaceSetup = {}) => {
  const { container } = render(
    Component || <Thumbnail.Empty placeholderIcon={CameraIcon} {...props} />,
  );
  return { container };
};

describe("<Thumbnail.empty />", () => {
  it("renders defaults", () => {
    const { container } = setup();
    expect(
      container.querySelector(".nimbus--aspect-ratio--1-1"),
    ).toHaveAttribute("style", "width: 100%;");
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-label",
      "Camera",
    );
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
});
