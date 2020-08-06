import * as React from "react";
import { render, screen } from "@testing-library/react";

import RadioButtonGroup from ".";

const options = [
  { label: "Label 1", value: "Value 1" },
  { label: "Label 2", value: "Value 2" },
  { label: "Label 3", value: "Value 3" },
];

describe("Render RadioButtonGroup", () => {
  it("shows shows single RadioButtonGroup", () => {
    render(
      <RadioButtonGroup
        label="Radio Button Group Label"
        name="NameGroup"
        options={options}
      />,
    );
    const element: HTMLElement = screen.getByRole("radio", {
      name: options[0].label,
    });
    expect(element).toBeTruthy();
  });
});
