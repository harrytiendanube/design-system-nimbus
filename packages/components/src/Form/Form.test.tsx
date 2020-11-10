import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Form, InputValidator } from "..";

const myTextValidation = {
  email: "custom email validation message",
};
const myLink = { children: "myLink", href: "https://www.myLink.com" };
const myLabelUser = "myLabelUser";
const myLabelAdmin = "myLabelAdmin";
const myLabelEmail = "myLabelEmail";
const myLabelPattern = "myLabelPattern";
const mySubmitLabel = "myOK";
const myButtonLabel = "myCancel";

const handleSubmit = jest.fn();
const handleButton = jest.fn();
const handleOnChange = jest.fn();
const handleOnBlur = jest.fn();

describe("Form", () => {
  beforeEach(() => {
    render(
      <Form
        textValidation={myTextValidation}
        alertText="Error"
        alertAppearance="danger"
        link={myLink}
        submitLabel={mySubmitLabel}
        onClickSubmit={handleSubmit}
        buttonLabel={myButtonLabel}
        onClickButton={handleButton}
      >
        <InputValidator
          label={myLabelUser}
          placeholder="Insert user"
          name="user"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          required
        />
        <InputValidator
          label={myLabelAdmin}
          placeholder="Insert Admin"
          name="admin"
          maxLength={10}
          minLength={5}
        />
        <InputValidator
          label={myLabelEmail}
          placeholder="Insert Email"
          name="email"
          type="email"
        />
        <InputValidator
          label={myLabelPattern}
          placeholder="Type something that contains 1"
          name="pattern"
          type="text"
          pattern="1"
        />
      </Form>,
    );
  });

  it("Render Form", () => {
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByRole("link", { name: myLink.children })).toBeTruthy();
    expect(screen.getByRole("button", { name: mySubmitLabel })).toBeTruthy();
    expect(screen.getByRole("button", { name: myButtonLabel })).toBeTruthy();
  });

  it("show validation error when User is empty which is mandatory", () => {
    const button = screen.getByRole("button", { name: mySubmitLabel });
    userEvent.click(button);
    expect(screen.getByText("This field is required")).toBeTruthy();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("show validation error when an invalid Email is typed", () => {
    const email = screen.getByRole("textbox", { name: myLabelEmail });
    userEvent.type(email, "invalidEmail");
    const button = screen.getByRole("button", { name: mySubmitLabel });
    userEvent.click(button);
    expect(screen.getByText(myTextValidation.email)).toBeTruthy();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("show validation error when a short admin value is typed", () => {
    const admin = screen.getByRole("textbox", { name: myLabelAdmin });
    userEvent.type(admin, "1234"); // lees than 5 characters
    const button = screen.getByRole("button", { name: mySubmitLabel });
    userEvent.click(button);
    expect(screen.getByText("Min length is 5")).toBeTruthy();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("show validation error when a wrong pattern value is typed", () => {
    const pattern = screen.getByRole("textbox", { name: myLabelPattern });
    userEvent.type(pattern, "234"); // any value that not contains "1"
    const button = screen.getByRole("button", { name: mySubmitLabel });
    userEvent.click(button);
    expect(screen.getByText("Error in pattern")).toBeTruthy();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("calls onClickSubmit when the form is valid", () => {
    const user = screen.getByRole("textbox", { name: myLabelUser });
    userEvent.type(user, "user valid");

    const email = screen.getByRole("textbox", { name: myLabelEmail });
    userEvent.type(email, "email@valid.com");

    const admin = screen.getByRole("textbox", { name: myLabelAdmin });
    userEvent.type(admin, "admin valid");

    const pattern = screen.getByRole("textbox", { name: myLabelPattern });
    userEvent.type(pattern, "pattern valid 1");

    const button = screen.getByRole("button", { name: mySubmitLabel });
    userEvent.click(button);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("calls onClickButton (cancel)", () => {
    const button = screen.getByRole("button", { name: myButtonLabel });
    userEvent.click(button);
    expect(handleButton).toHaveBeenCalled();
  });
});
