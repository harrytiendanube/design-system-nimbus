import * as React from "react";
import { render, screen } from "@testing-library/react";

import Text from ".";

const myText = "myText";
const myAppearance = "default";
const myBold = false;
const myBlock = false;
const mySize = "base";
const myBackground = false;
const myTextAlign = "left";

describe("<Text />", () => {
  it("render", () => {
    render(
      <Text
        appearance={myAppearance}
        bold={myBold}
        block={myBlock}
        size={mySize}
        textAlign={myTextAlign}
        background={myBackground}
      >
        {myText}
      </Text>,
    );
    const element: HTMLElement = screen.getByText(myText);
    expect(element).toHaveClass(
      "nimbus--text nimbus--text-size--base nimbus--text-color--default",
    );
  });
  it("render without optional params", () => {
    render(<Text>{myText}</Text>);
    const element: HTMLElement = screen.getByText(myText);
    expect(element).toHaveClass(
      "nimbus--text nimbus--text-size--base nimbus--text-color--default",
    );
  });
  it("render skeleton", () => {
    const { container } = render(<Text.Skeleton width="medium" size="base" />);
    expect(container.querySelector(".nimbus--text-skeleton")).toBeTruthy();
  });
});
