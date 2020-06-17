import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render } from "@testing-library/react";
import { LayoutBackground, Text } from "../";
import image from "../../utils/login-background.jpg";

describe("LayoutBackground", () => {
  let myText, classNameBase, myTestId, url;

  beforeAll(() => {
    myText = "myText";
    classNameBase = "nimbus--layout-background";
    myTestId = "LayoutBackground";
    url =
      "https://d26lpennugtm8s.cloudfront.net/assets/insti/img/login/login-background.jpg";
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

  it("Render with URL image and Text Component as children", () => {
    const { getByTestId, getByText } = render(
      <LayoutBackground image={url}>
        <Text>{myText}</Text>
      </LayoutBackground>,
    );
    const component = getByTestId(myTestId);
    expect(component).toBeTruthy();
    expect(component).toHaveTextContent(myText);
    expect(component).toHaveClass(`${classNameBase}`);
    expect(component).toContainHTML(`<div class="${classNameBase}__content">`);
    expect(component).toContainHTML(
      `<div class="${classNameBase}__image" style="background-image: url(${url});"`,
    );
    expect(getByText(myText)).toContainHTML("</p>");
  });
});
