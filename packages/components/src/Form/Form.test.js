import React from "react";
import { render } from "@testing-library/react";
import Form from ".";
import "@testing-library/jest-dom/extend-expect";

describe("Form", () => {
  it("Render Form", () => {
    const { getByTestId } = render(
      <Form data-testid="Form">children</Form>
    );
    const component = getByTestId("Form");
    /** Validate than text is the same as the content tag */
    expect(component).toHaveTextContent("children");
  });
});
