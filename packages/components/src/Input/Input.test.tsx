import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ArrowRightIcon } from "@tiendanube/icons";
import { Input } from "..";
import { InterfaceNameValue } from "../common/interfaces";

const myLabel = "myLabel";
const myPlaceholder = "myPlaceholder";
const myValue = "myValue";
const myNewValue = "myNewValue";
const myName = "myName";
const myMinLength = 5;
const myMaxLength = 10;

describe("<Input />", () => {
  it("render", () => {
    const { container } = render(
      <Input
        label={myLabel}
        placeholder={myPlaceholder}
        value={myValue}
        name={myName}
        isValid
        minLength={myMinLength}
        maxLength={myMaxLength}
        required
      />,
    );
    const input = screen.getByRole("textbox", { name: myLabel });
    expect(input).toHaveProperty("minLength", myMinLength);
    expect(input).toHaveProperty("maxLength", myMaxLength);
    expect(input).toHaveProperty("required");
    expect(screen.getByLabelText(myLabel)).toBeTruthy();
    expect(screen.getByPlaceholderText(myPlaceholder)).toBeTruthy();
    expect(screen.getByDisplayValue(myValue)).toBeTruthy();
    // Textbox does not render any button to clear input
    expect(screen.queryByRole("button")).toBeNull();
    // Textbox does not render ExclamationCircleIcon when isValid
    expect(
      container.querySelector("span.nimbus--input__append"),
    ).not.toBeTruthy();
    expect(container.querySelector("svg")).toBeNull();
  });

  it("calls onChange", () => {
    const handleChange = (event: InterfaceNameValue) => {
      expect(myNewValue).toContain(event.value);
    };
    render(
      <Input
        placeholder={myPlaceholder}
        name={myName}
        onChange={handleChange}
      />,
    );
    const element: HTMLElement = screen.getByRole("textbox");
    userEvent.type(element, myNewValue);
  });

  it("calls onBlur", () => {
    const handleBlur = (event: InterfaceNameValue) => {
      expect(event.value).toBe(myNewValue);
    };
    render(
      <Input placeholder={myPlaceholder} name={myName} onBlur={handleBlur} />,
    );
    const element: HTMLElement = screen.getByRole("textbox");
    userEvent.type(element, myNewValue);
    fireEvent.blur(element);
  });

  it("calls onFocus", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(
      <Input placeholder={myPlaceholder} name={myName} onFocus={handleFocus} />,
    );
    const element: HTMLElement = screen.getByRole("textbox");
    userEvent.type(element, myNewValue);
    expect(handleFocus).toHaveBeenCalled();
    /* Textbox does not call handleBlur if it not provided */
    fireEvent.blur(element);
    expect(handleBlur).not.toHaveBeenCalled();
  });
});

describe('<Input type="search" />', () => {
  it("render with value", () => {
    const { container } = render(
      <Input
        type="search"
        label={myLabel}
        placeholder={myPlaceholder}
        value={myValue}
        name={myName}
      />,
    );
    expect(screen.getByRole("searchbox")).toBeTruthy();
    // Search boxes with value renders a button to clear input
    expect(screen.getByRole("button")).toBeTruthy();
    // Search boxes does not render any label
    expect(screen.queryByLabelText(myLabel)).toBeNull();
    expect(screen.getByPlaceholderText(myPlaceholder)).toBeTruthy();
    expect(screen.getByDisplayValue(myValue)).toBeTruthy();
    // Search boxes renders two icons (SearchIcon, CloseIcon)
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });

  it("render without value", () => {
    const { container } = render(
      <Input
        type="search"
        label={myLabel}
        placeholder={myPlaceholder}
        name={myName}
      />,
    );
    expect(screen.getByRole("searchbox")).toBeTruthy();
    // Search boxes without value renders a button to clear input
    expect(screen.queryByRole("button")).toBeNull();
    // Search boxes does not render any label
    expect(screen.queryByLabelText(myLabel)).toBeNull();
    expect(screen.getByPlaceholderText(myPlaceholder)).toBeTruthy();
    expect(screen.queryByDisplayValue(myValue)).toBeNull();
    // Search boxes without value renders one icon (SearchIcon)
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });
  it("calls onSubmit on Enter", () => {
    const handleSubmit = (event: InterfaceNameValue) => {
      expect(event.value).toBe(myValue);
    };
    render(
      <Input
        type="search"
        placeholder={myPlaceholder}
        name={myName}
        value={myValue}
        onSubmit={handleSubmit}
      />,
    );
    const element: HTMLElement = screen.getByRole("searchbox");
    userEvent.type(element, `{enter}`);
  });

  it("does not call onSubmit on Enter if it not provided", () => {
    const handleSubmit = jest.fn();
    render(
      <Input
        type="search"
        placeholder={myPlaceholder}
        name={myName}
        value={myValue}
      />,
    );
    const element: HTMLElement = screen.getByRole("searchbox");
    userEvent.type(element, `{enter}`);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit on Close", () => {
    const handleSubmit = (event: InterfaceNameValue) => {
      expect(event.value).toBe("");
    };
    render(
      <Input
        type="search"
        placeholder={myPlaceholder}
        name={myName}
        value={myValue}
        onSubmit={handleSubmit}
      />,
    );
    const element: HTMLElement = screen.getByRole("button");
    userEvent.click(element);
  });

  it("does not call onSubmit on Close if it not provided", () => {
    const handleSubmit = jest.fn();
    render(
      <Input
        type="search"
        placeholder={myPlaceholder}
        name={myName}
        value={myValue}
      />,
    );
    const element: HTMLElement = screen.getByRole("button");
    userEvent.click(element);
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});

describe("<Input prepend={ArrowRightIcon} />", () => {
  it("render", () => {
    const { container } = render(
      <Input
        prepend={ArrowRightIcon}
        label={myLabel}
        placeholder={myPlaceholder}
        value={myValue}
        name={myName}
      />,
    );
    expect(screen.getByRole("textbox")).toBeTruthy();
    // Textbox does not render any button to clear input
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByLabelText(myLabel)).toBeTruthy();
    expect(screen.getByPlaceholderText(myPlaceholder)).toBeTruthy();
    expect(screen.getByDisplayValue(myValue)).toBeTruthy();
    // Render a one single icon received as parameter
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });
});

describe("<Input multiRows rows={3} focused />", () => {
  it("render", () => {
    const myRows = 3;
    render(
      <Input
        multiRows
        focused
        rows={myRows}
        label={myLabel}
        placeholder={myPlaceholder}
        value={myValue}
        name={myName}
      />,
    );
    expect(screen.getByRole("textbox")).toHaveProperty("rows", myRows);
    expect(screen.getByLabelText(myLabel)).toBeTruthy();
    expect(screen.getByPlaceholderText(myPlaceholder)).toBeTruthy();
    expect(screen.getByDisplayValue(myValue)).toBeTruthy();
  });
});

describe("<Input isValid={false} />", () => {
  it("render", () => {
    const { container } = render(
      <Input placeholder={myPlaceholder} name={myName} isValid={false} />,
    );
    expect(screen.getByRole("textbox")).toBeTruthy();
    expect(screen.getByPlaceholderText(myPlaceholder)).toBeTruthy();
    // Render ExclamationCircleIcon when not isValid
    expect(container.querySelector("span.nimbus--input__append")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
