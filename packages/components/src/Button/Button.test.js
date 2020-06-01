import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, fireEvent } from "@testing-library/react";
import Button from ".";

describe("Button", () => {
  let myText, classNameBase;

  beforeEach(() => {
    myText = "this is my Danger button";
    classNameBase = "nimbus--button";
  });

  it("Render Button", () => {
    const { getByText } = render(<Button>{myText}</Button>);
    const button = getByText(myText);
    /** Validate than text is the same as the content tag */
    expect(button).toHaveTextContent(myText);
    /** Validate default style without appearance attribute */
    expect(button).toHaveClass(`${classNameBase}--light`);
  });

  it("Render Primary Button", () => {
    const { getByText } = render(
      <Button appearance="primary">{myText}</Button>,
    );
    const button = getByText(myText);
    /** Validate is primary style. */
    expect(button).toHaveClass(`${classNameBase}--primary`);
  });

  it("Render Secondary Button", () => {
    const { getByText } = render(
      <Button appearance="secondary">{myText}</Button>,
    );
    const button = getByText(myText);
    /** Validate is secondary style. */
    expect(button).toHaveClass(`${classNameBase}--secondary`);
  });

  it("Render Light Button", () => {
    const { getByText } = render(<Button appearance="light">{myText}</Button>);
    const button = getByText(myText);
    /** Validate is light style. */
    expect(button).toHaveClass(`${classNameBase}--light`);
  });

  it("Render Danger Button", () => {
    const { getByText } = render(
      <Button appearance="danger">this is my Danger button</Button>,
    );
    const button = getByText(myText);
    /** Validate is danger style. */
    expect(button).toHaveClass(`${classNameBase}--danger`);
  });

  it("Render Transparent Button", () => {
    const { getByText } = render(
      <Button appearance="transparent">{myText}</Button>,
    );
    const button = getByText(myText);
    /** Validate transparent style. */
    expect(button).toHaveClass("nimbus--button--transparent");
  });

  it("Render button with a left icon", () => {
    const { getByTestId } = render(
      <Button startIcon="Facebook">{myText}</Button>,
    );
    const icon = getByTestId("icon-Facebook");
    expect(icon).toBeInTheDocument();
  });

  it("Render button with a right icon", () => {
    const { getByTestId } = render(
      <Button endIcon="LongArrowRight">{myText}</Button>,
    );
    const icon = getByTestId("icon-LongArrowRight");
    expect(icon).toBeInTheDocument();
  });

  it("Render button with a left and right icon", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button"
        startIcon="Facebook"
        endIcon="LongArrowRight"
      >
        Button with left y right icon
      </Button>,
    );
    const iconLeft = getByTestId("icon-Facebook");
    const iconRight = getByTestId("icon-LongArrowRight");
    expect(iconLeft).toBeInTheDocument();
    expect(iconRight).toBeInTheDocument();
  });

  it("Click on Button must run callback", () => {
    const callback = jest.fn();
    const { getByText } = render(<Button onClick={callback}>{myText}</Button>);
    const button = getByText(myText);
    fireEvent.click(button);
    expect(callback).toHaveBeenCalled();
  });
});
