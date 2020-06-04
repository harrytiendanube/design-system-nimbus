import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render } from "@testing-library/react";
import Text from ".";

describe("Text", () => {
  it("Render Text", () => {
    const myText = "myText";
    const { getByText } = render(<Text>{myText}</Text>);
    const component = getByText(myText);
    expect(component).toBeTruthy();
    expect(component).toContainHTML("</p>");
  });
});
