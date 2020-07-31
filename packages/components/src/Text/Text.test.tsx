import * as React from "react";
import { render, screen } from "@testing-library/react";

import Text from ".";

const pattern = "myText";

describe("Render Text", () => {
  it("shows myText message", () => {
    render(<Text>{pattern}</Text>);
    const element: HTMLElement = screen.getByText(pattern);
    expect(element).toBeTruthy();
  });
});
