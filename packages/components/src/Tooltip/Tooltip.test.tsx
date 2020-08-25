import * as React from "react";
import { render, screen } from "@testing-library/react";

import { InfoCircleIcon } from "@tiendanube/icons";
import { Tooltip, Text } from "..";

describe("Render Tooltip", () => {
  it("shows single Tooltip", () => {
    render(
      <Tooltip
        name="tooltip-component"
        labelIcon={InfoCircleIcon}
        labelText="Tooltip label"
      >
        <Text>Tooltip text</Text>
      </Tooltip>,
    );
    const element: HTMLElement = screen.getByRole("tooltip", {
      name: "",
    });
    expect(element).toBeTruthy();
  });
});
