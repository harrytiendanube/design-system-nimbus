import React from "react";
import { render } from "@testing-library/react";
import Alert from ".";
import "@testing-library/jest-dom/extend-expect";

describe("Alert", () => {
  it("Render Alert", () => {
    const { getByTestId } = render(<Alert data-testid="Alert">children</Alert>);
    const component = getByTestId("Alert");
    /** Validate than text is the same as the content tag */
    expect(component).toHaveTextContent("children");
  });
});
