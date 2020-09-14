import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Alert from ".";

const myAppearance = "primary";
const myTitle = "myTitle";
const myText = "myText";
const myPrimaryLabel = "myPrimaryLabel";
const mySecondaryLabel = "mySecondaryLabel";
const mySecondaryTo = "http://www.secondaryTo.com";

describe("<Alert />", () => {
  it("renders", () => {
    const { container } = render(
      <Alert
        show
        appearance={myAppearance}
        title={myTitle}
        primaryLabel={myPrimaryLabel}
        onClickPrimary={jest.fn}
        secondaryLabel={mySecondaryLabel}
        secondaryTo={mySecondaryTo}
        onDismiss={jest.fn}
      >
        {myText}
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveClass(
      `nimbus--alert--${myAppearance}`,
    );
    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.getByRole("button", { name: myPrimaryLabel })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Close" })).toBeTruthy();
    expect(screen.getByRole("link", { name: mySecondaryLabel })).toBeTruthy();
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });

  it("renders without optional parameters", () => {
    const { container } = render(<Alert show>{myText}</Alert>);
    expect(screen.getByRole("alert")).toHaveClass(
      `nimbus--alert--${myAppearance}`,
    );
    expect(screen.queryByRole("heading", { name: myTitle })).toBeFalsy();
    expect(screen.queryByRole("button", { name: myPrimaryLabel })).toBeFalsy();
    expect(screen.queryByRole("button", { name: "Close" })).toBeFalsy();
    expect(screen.queryByRole("link", { name: mySecondaryLabel })).toBeFalsy();
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("does not renders without show parameter", () => {
    render(<Alert>{myText}</Alert>);
    expect(screen.queryByRole("alert")).toBeFalsy();
  });

  it("calls onClickPrimary", () => {
    const handleClickPrimary = jest.fn();
    render(
      <Alert
        show
        primaryLabel={myPrimaryLabel}
        onClickPrimary={handleClickPrimary}
      >
        {myText}
      </Alert>,
    );
    userEvent.click(screen.getByRole("button"));
    expect(handleClickPrimary).toHaveBeenCalled();
  });
});
