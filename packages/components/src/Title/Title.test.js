import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render } from "@testing-library/react";
import Title from ".";

describe("Title", () => {
  let myText;
  beforeAll(() => {
    myText = "myText";
  });

  it("Render Title", () => {
    const { getByText } = render(<Title>{myText}</Title>);
    const component = getByText(myText);
    expect(component).toBeTruthy();
  });
  it("Title implemnts <h1> html tag", () => {
    const { getByText } = render(<Title type="h1">{myText}</Title>);
    const component = getByText(myText);
    expect(component).toContainHTML("</h1>");
  });
  it("Title implemnts <h2> html tag", () => {
    const { getByText } = render(<Title type="h2">{myText}</Title>);
    const component = getByText(myText);
    expect(component).toContainHTML("</h2>");
  });
  it("Title implemnts <h3> html tag", () => {
    const { getByText } = render(<Title type="h3">{myText}</Title>);
    const component = getByText(myText);
    expect(component).toContainHTML("</h3>");
  });
  it("Title implemnts <h4> html tag", () => {
    const { getByText } = render(<Title type="h4">{myText}</Title>);
    const component = getByText(myText);
    expect(component).toContainHTML("</h4>");
  });
  it("Title implemnts <h5> html tag", () => {
    const { getByText } = render(<Title type="h5">{myText}</Title>);
    const component = getByText(myText);
    expect(component).toContainHTML("</h5>");
  });
});
