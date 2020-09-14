import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, screen } from "@testing-library/react";
import { LayoutBackground, Text } from "..";

const myText = "myText";
const myUrl = "https://www.myUrl.com";
const myClass = "nimbus--layout-background";

describe("LayoutBackground", () => {
  it("Render with URL image", () => {
    const { container } = render(
      <LayoutBackground image={myUrl}>
        <Text>{myText}</Text>
      </LayoutBackground>,
    );
    expect(screen.getByText(myText));
    expect(container.querySelectorAll("div")[0]).toHaveClass(myClass);
    expect(container.querySelectorAll("div")[1]).toHaveClass(
      `${myClass}__content`,
    );
    expect(container.querySelectorAll("div")[2]).toHaveClass(
      `${myClass}__image`,
    );
    expect(container.querySelectorAll("div")[2]).toHaveAttribute(
      "style",
      "background-image: url(https://www.myUrl.com);",
    );
  });
});
