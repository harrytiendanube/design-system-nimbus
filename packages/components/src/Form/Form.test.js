/* eslint-disable spellcheck/spell-checker */
import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import { Form, Input } from "../";

describe("Form", () => {
  let formRendered,
    callbackSubmit,
    callbackButton,
    callbackOnChangeA,
    callbackOnChangeB;
  beforeEach(() => {
    callbackSubmit = jest.fn();
    callbackButton = jest.fn();
    callbackOnChangeA = jest.fn();
    callbackOnChangeB = jest.fn();
    formRendered = render(
      <Form
        alertText="alertText"
        alertAppearance="danger"
        link="link"
        linkTo="http://www.tiendanube.com"
        submitLabel="submitLabel"
        buttonLabel="buttonLabel"
        onClickSubmit={callbackSubmit}
        onClickButton={callbackButton}
      >
        <Input
          label="label input A"
          value="value input A"
          placeholder="placeholder A"
          name="nameA"
          onChange={callbackOnChangeA}
        />
        <Input
          label="label input B"
          value="value input B"
          placeholder="placeholder B"
          name="nameB"
          onChange={callbackOnChangeB}
        />
      </Form>,
    );
    // screen.debug();
  });

  it("Render Form", () => {
    const { getByTestId } = formRendered;
    const component = getByTestId("Form");
    expect(component).toBeTruthy();
  });

  it("Render inside Alert", () => {
    const { getByText } = formRendered;
    expect(getByText("alertText")).toContainHTML(
      '<p class="nimbus--text nimbus--text_regular">alertText</p>',
    );
  });

  it("Render inside Inuput A", () => {
    const { getByText } = formRendered;
    expect(getByText("label input A")).toContainHTML(
      '<label for="input_nameA">label input A</label>',
    );
  });

  it("Render inside Inuput B", () => {
    const { getByText } = formRendered;
    expect(getByText("label input B")).toContainHTML(
      '<label for="input_nameB">label input B</label>',
    );
  });

  it("Render inside Link", () => {
    const { getByText } = formRendered;
    expect(getByText("link")).toContainHTML(
      '<a class="nimbus--link" href="http://www.tiendanube.com" target="_blank">link</a>',
    );
  });

  it("Click on submit must run callback", () => {
    const { getByText } = formRendered;
    const button = getByText("submitLabel");
    fireEvent.click(button);
    expect(callbackSubmit).toHaveBeenCalled();
  });

  it("Click on button must run callback", () => {
    const { getByText } = formRendered;
    const button = getByText("buttonLabel");
    fireEvent.click(button);
    expect(callbackButton).toHaveBeenCalled();
  });
});
