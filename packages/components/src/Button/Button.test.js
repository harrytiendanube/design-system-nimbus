import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from ".";
import "@testing-library/jest-dom/extend-expect";

describe("Button", () => {
  it("Render Button", () => {
    const { getByTestId } = render(
      <Button data-testid="button"> this is my button </Button>,
    );
    const button = getByTestId("button");
    /** Validate than text is the same as the content tag */
    expect(button).toHaveTextContent("this is my button");
    /** Validate default style without color attribute */
    expect(button).toHaveClass("nimbus--button--primary");
  });

  it("Render Primary Button", () => {
    const { getByTestId } = render(
      <Button data-testid="button" color="primary">
        this is my Parimary button
      </Button>,
    );
    const button = getByTestId("button");
    /** Validate primary style. */
    expect(button).toHaveClass("nimbus--button--primary");
  });
  it("Render Secondary Button", () => {
    const { getByTestId } = render(
      <Button data-testid="button" color="secondary">
        this is my Secondary button
      </Button>,
    );
    const button = getByTestId("button");
    /** Validate secondary style. */
    expect(button).toHaveClass("nimbus--button--secondary");
  });
  it("Render Light Button", () => {
    const { getByTestId } = render(
      <Button data-testid="button" color="light">
        this is my Light button
      </Button>,
    );
    const button = getByTestId("button");
    /** Validate light style. */
    expect(button).toHaveClass("nimbus--button--light");
  });
  it("Render Danger Button", () => {
    const { getByTestId } = render(
      <Button data-testid="button" color="danger">
        this is my Danger button
      </Button>,
    );
    const button = getByTestId("button");
    /** Validate danger style. */
    expect(button).toHaveClass("nimbus--button--danger");
  });
  it("Render Transparent Button", () => {
    const { getByTestId } = render(
      <Button data-testid="button" color="transparent">
        this is my Transparent button
      </Button>,
    );
    const button = getByTestId("button");
    /** Validate transparent style. */
    expect(button).toHaveClass("nimbus--button--transparent");
  });
  it("Render button with a left icon", () => {
    const { getByTestId } = render(
      <Button data-testid="button" start="Facebook">
        Button with left icon
      </Button>,
    );
    const icon = getByTestId("icon-Facebook");
    expect(icon).toBeInTheDocument();
  });
  it("Render button with a right icon", () => {
    const { getByTestId } = render(
      <Button data-testid="button" end="LongArrowRight">
        Button with right icon
      </Button>,
    );
    const icon = getByTestId("icon-LongArrowRight");
    expect(icon).toBeInTheDocument();
  });
  it("Render button with a left and right icon", () => {
    const { getByTestId } = render(
      <Button data-testid="button" start="Facebook" end="LongArrowRight">
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
    const { getByTestId } = render(
      <Button data-testid="button" onClick={callback}>
        this is my button
      </Button>,
    );
    const button = getByTestId("button");
    fireEvent.click(button);
    expect(callback).toHaveBeenCalled();
  });
});
