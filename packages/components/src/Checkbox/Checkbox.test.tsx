import * as React from "react";
import { render, screen } from "@testing-library/react";

import Checkbox from ".";

const label = "label";

describe("Render Checkbox", () => {
  it("shows single Checkbox", () => {
    render(<Checkbox label={label} name="checkboxA" checked />);
    const element: HTMLElement = screen.getByRole("checkbox", {
      name: label,
    });
    expect(element).toBeTruthy();
  });
});
