import React from "react";

import { render } from "@testing-library/react";
import Text from ".";
import "@testing-library/jest-dom/extend-expect";

describe("Text", () => {
  it("Render Text", () => {
    const myText = "myText";
    const { getByText } = render(<Text>{myText}</Text>);
    const component = getByText(myText);
    expect(component).toBeTruthy();
    expect(component).toContainHTML("</p>");
  });
});
