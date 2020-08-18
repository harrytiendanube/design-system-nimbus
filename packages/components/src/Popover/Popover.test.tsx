import * as React from "react";
import { render, screen } from "@testing-library/react";

import { Popover, Text } from "..";

describe("Render Popover", () => {
  it("shows single Popover", () => {
    render(
      <Popover id="120" label="5 products" title="Order #120">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
          odio non est venenatis porttitor.
        </Text>
      </Popover>,
    );
    const element: HTMLElement = screen.getByRole("presentation", {
      name: "",
    });
    expect(element).toBeTruthy();
  });
});
