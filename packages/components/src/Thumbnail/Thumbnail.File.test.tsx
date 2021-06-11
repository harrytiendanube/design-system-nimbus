/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Thumbnail, { InterfaceThumbnailFile } from "./Thumbnail";

interface InterfaceSetup {
  Component?: JSX.Element;
  props?: Omit<InterfaceThumbnailFile, "ariaLabel" | "onChange">;
}

const setup = ({ Component, props }: InterfaceSetup = {}) => {
  const handleOnChange = jest.fn();
  const { container } = render(
    Component || (
      <Thumbnail.File
        ariaLabel="myAriaLabel"
        onChange={handleOnChange}
        {...props}
      />
    ),
  );
  const elementButton = screen.getByRole("button", { name: "myAriaLabel" });
  const elementInput = container.querySelector("input") as HTMLInputElement;

  return { container, elementButton, elementInput, handleOnChange };
};

describe("<Thumbnail.File />", () => {
  it("renders defaults", () => {
    const { container, elementButton, elementInput } = setup();
    expect(elementButton).toBeInTheDocument();
    expect(
      container.querySelector(".nimbus--aspect-ratio--1-1"),
    ).toHaveAttribute("style", "width: 100%;");
    expect(elementInput).toHaveAttribute(
      "accept",
      "image/jpeg,image/gif,image/png",
    );
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-label",
      "PlusCircle",
    );
  });

  it("renders optional parameters", () => {
    const { container, elementButton, elementInput } = setup({
      props: {
        aspectRatio: "16-9",
        width: "90%",
        disabled: true,
        accept: "image/gif",
        open: true,
      },
    });
    expect(elementButton).toHaveAttribute("disabled");
    expect(
      container.querySelector(".nimbus--aspect-ratio--16-9"),
    ).toHaveAttribute("style", "width: 90%;");
    expect(elementInput).toHaveAttribute("accept", "image/gif");
  });

  describe("when is button is clicked", () => {
    it("should be open file chooser", () => {
      const { elementButton } = setup({});
      userEvent.click(elementButton);
      // TODO: expect open file chooser
    });
  });

  describe("when files are chosen", () => {
    it("should call onChange", () => {
      const { elementInput, handleOnChange } = setup({});
      const event = {
        target: {
          files: { 1: { name: "file1" }, 2: { name: "file2" } },
        },
      };
      fireEvent.change(elementInput, event);
      expect(handleOnChange).toBeCalled();
    });
  });
});
