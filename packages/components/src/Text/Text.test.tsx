import * as React from "react";
import { render, screen } from "@testing-library/react";

import Text from ".";

const myText = "myText";

describe("<Text />", () => {
  it("render", () => {
    render(<Text size="regular">{myText}</Text>);
    const element: HTMLElement = screen.getByText(myText);
    expect(element).toHaveClass("nimbus--text nimbus--text_regular");
  });
  it("render without size", () => {
    render(<Text>{myText}</Text>);
    const element: HTMLElement = screen.getByText(myText);
    expect(element).toHaveClass("nimbus--text nimbus--text_regular");
  });
});
