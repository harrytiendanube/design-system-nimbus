import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import LayoutBackground from ".";
import image from "../../../storybook/stories/utils";

describe("LayoutBackground", () => {
  let myText, classNameBase;
  const myTestId = "LayoutBackground";

  beforeEach(() => {
    myText = "myText";
    classNameBase = "nimbus--layout-background";
  });

  it("Render with import image", () => {
    const { getByTestId } = render(
      <LayoutBackground image={image}>{myText}</LayoutBackground>,
    );
    const component = getByTestId(myTestId);
    expect(component).toBeTruthy();
    expect(component).toHaveTextContent(myText);
    expect(component).toHaveClass(`${classNameBase}`);
    expect(component).toContainHTML(`<div class="${classNameBase}__content">`);
    expect(component).toContainHTML(
      `<div class="${classNameBase}__image" style="background-image: url(${image});"`,
    );
  });

  it("Render with URL image", () => {
    const url =
      "https://d26lpennugtm8s.cloudfront.net/assets/insti/img/login/login-background.jpg";
    const { getByTestId } = render(
      <LayoutBackground image={url}>{myText}</LayoutBackground>,
    );
    const component = getByTestId(myTestId);
    expect(component).toBeTruthy();
    expect(component).toHaveTextContent(myText);
    expect(component).toHaveClass(`${classNameBase}`);
    expect(component).toContainHTML(`<div class="${classNameBase}__content">`);
    expect(component).toContainHTML(
      `<div class="${classNameBase}__image" style="background-image: url(${url});"`,
    );
  });
});
