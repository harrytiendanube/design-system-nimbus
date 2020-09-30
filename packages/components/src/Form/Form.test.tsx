import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Form, Input } from "..";

// Form Constants
const myAlertText = "myAlertText";
const myAlertAppearance = "danger";
const myLink = "myLink";
const myLinkTo = "https://www.myLink.com";
const mySubmitLabel = "mySubmitLabel";
const myButtonLabel = "myButtonLabel";
const myTextValidation = {
  required: "this field is required",
  email: " this field is not email",
};
const handleSubmit = jest.fn();
const handleButton = jest.fn();
// Input Constants
const myInputLabel = "";
const myInputValue = "";
const myPlaceholder = "";
const myInputName = "";
const handleOnChange = jest.fn();

describe("Form", () => {
  beforeEach(() => {
    render(
      <Form
        alertText={myAlertText}
        alertAppearance={myAlertAppearance}
        link={myLink}
        linkTo={myLinkTo}
        submitLabel={mySubmitLabel}
        buttonLabel={myButtonLabel}
        onClickSubmit={handleSubmit}
        onClickButton={handleButton}
        textValidation={myTextValidation}
      >
        <Input
          label={myInputLabel}
          value={myInputValue}
          placeholder={myPlaceholder}
          name={myInputName}
          onChange={handleOnChange}
        />
      </Form>,
    );
  });

  it("Render Form", () => {
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByRole("textbox", { name: myInputLabel })).toBeTruthy();
    expect(screen.getByRole("link", { name: myLink })).toBeTruthy();
    expect(screen.getByRole("button", { name: myButtonLabel })).toBeTruthy();
    expect(screen.getByRole("button", { name: mySubmitLabel })).toBeTruthy();
  });

  it("calls onClickSubmit", () => {
    const button = screen.getByRole("button", { name: mySubmitLabel });
    userEvent.click(button);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("calls onClickButton", () => {
    const button = screen.getByRole("button", { name: myButtonLabel });
    userEvent.click(button);
    expect(handleButton).toHaveBeenCalled();
  });
});
