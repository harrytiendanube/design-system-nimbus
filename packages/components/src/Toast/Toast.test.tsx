import * as React from "react";
import { render, screen } from "@testing-library/react";

import Toast from ".";

describe("<Toast />", () => {
  it("render", () => {
    render(<Toast label="myLabel" appearance="primary" onClose={jest.fn()} />);
    const element: HTMLElement = screen.getByText("myLabel");
    expect(element).toBeTruthy();
  });
});
