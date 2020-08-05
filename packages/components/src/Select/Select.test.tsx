import * as React from "react";
import { render, screen } from "@testing-library/react";

import Select from ".";

const placeholder = "Select an Option";

describe("Render Select", () => {
  it("shows single select", () => {
    render(
      <Select
        label="Select Label"
        name="Select name"
        placeholder={placeholder}
        options={[
          { label: "Option 1", value: "Value 1" },
          { label: "Option 2", value: "Value 2" },
          { label: "Option 3", value: "Value 3" },
          { label: "Option 4", value: "Value 4" },
        ]}
      />,
    );
    const element: HTMLElement = screen.getByRole("option", {
      name: placeholder,
    });
    expect(element).toBeTruthy();
  });
});
