import React from "react";
import { render } from "@testing-library/react";
import Text from ".";
import "@testing-library/jest-dom/extend-expect";

describe("Text", () => {
  it("Render Text", () => {
    const { getByTestId } = render(<Text data-testid="Text">children</Text>);
    const component = getByTestId("Text");
    /** Validate than text is the same as the content tag */
    expect(component).toHaveTextContent("children");
  });
});
