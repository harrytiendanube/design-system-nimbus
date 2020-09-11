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

describe("<Input />", () => {
  it("render", () => {
    const { container } = render(
      <Input
        label={myLabel}
        placeholder={myPlaceholder}
        value={myValue}
        name={myName}
      />,
    );
    expect(screen.getByRole("textbox", { name: myLabel })).toBeTruthy();
    // Textbox does not render any button to clear input
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByLabelText(myLabel)).toBeTruthy();
    expect(screen.getByPlaceholderText(myPlaceholder)).toBeTruthy();
    expect(screen.getByDisplayValue(myValue)).toBeTruthy();
    // Textbox does not render any icon
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
