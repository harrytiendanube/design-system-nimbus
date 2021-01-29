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
  it("render span", () => {
    const { container } = render(
      <>
        <Text>
          Text content<Text.Span>Span content</Text.Span>
        </Text>
        <Text>
          Text content
          <Text.Span size="small" appearance="primary" background bold>
            Span content
          </Text.Span>
        </Text>
      </>,
    );
    expect(container.querySelector(".nimbus--text-span")).toBeTruthy();
    expect(container.querySelector(".nimbus--text-size--small")).toBeTruthy();
    expect(
      container.querySelector(".nimbus--text-color--primary"),
    ).toBeTruthy();
    expect(
      container.querySelector(".nimbus--text-background--primary"),
    ).toBeTruthy();
    expect(container.querySelector(".nimbus--text--bold")).toBeTruthy();
  });
});
