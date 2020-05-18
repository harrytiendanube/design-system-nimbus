import React from "react";
import { render } from "@testing-library/react";
import Title from ".";
import "@testing-library/jest-dom/extend-expect";

describe("Title", () => {
  it("Render Title", () => {
    const { getByTestId } = render(<Title data-testid="Title">children</Title>);
    const component = getByTestId("Title");
    /** Validate than text is the same as the content tag */
    expect(component).toHaveTextContent("children");
  });
});
