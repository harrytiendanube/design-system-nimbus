import React from "react";
import { render } from "@testing-library/react";
import LayoutBackground from ".";
import "@testing-library/jest-dom/extend-expect";

describe("LayoutBackground", () => {
  it("Render LayoutBackground", () => {
    const { getByTestId } = render(
      <LayoutBackground>children</LayoutBackground>,
    );
    const component = getByTestId("LayoutBackground");
    /** Validate than text is the same as the content tag */
    expect(component).toHaveTextContent("children");
  });
});
