import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render } from "@testing-library/react";
import Form from ".";

describe("Form", () => {
  it("Render Form", () => {
    const myText = "myText";
    const { getByText } = render(<Form>{myText}</Form>);
    const component = getByText(myText);
    expect(component).toBeTruthy();
  });
});
