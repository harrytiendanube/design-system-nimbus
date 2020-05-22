import React from "react";
import { render } from "@testing-library/react";
import Title from ".";
import "@testing-library/jest-dom/extend-expect";

describe("Title", () => {
  it("Render Title", () => {
    const myText = "myText";
    const { getByText } = render(<Title>{myText}</Title>);
    const component = getByText(myText);
    expect(component).toBeTruthy();
  });
  it("Title implemnts <h1> html tag", () => {
    const myText = "myText";
    const { getByText } = render(<Title>{myText}</Title>);
    const component = getByText(myText);
    expect(component).toContainHTML("</h1>");
  });
});
