/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ArrowRightIcon } from "@tiendanube/icons";
import { Input } from "..";
import { InterfaceNameValue } from "../common/interfaces";

const InputComponent = (props: any) => (
  <Input
    label="myLabel"
    placeholder="myPlaceholder"
    value="myValue"
    name="myName"
    autoCapitalize
    autoCorrect
    required
    minLength={5}
    maxLength={10}
    {...props}
  />
);

const setup = ({ Component, props }: any) => {
  const { container } = render(Component || <InputComponent {...props} />);
  return { container };
};

describe("<Input />", () => {
  it("render", () => {
    const { container } = setup({ props: {} });
    const input = screen.getByRole("textbox", { name: "myLabel" });
    expect(input).toHaveProperty("minLength", 5);
    expect(input).toHaveProperty("maxLength", 10);
    expect(input).toHaveProperty("required");
    expect(screen.getByLabelText("myLabel")).toBeTruthy();
    expect(screen.getByPlaceholderText("myPlaceholder")).toBeTruthy();
    expect(screen.getByDisplayValue("myValue")).toBeTruthy();
    // Textbox does not render any button to clear input
    expect(screen.queryByRole("button")).toBeNull();
    // Textbox does not render ExclamationCircleIcon when error is null
    expect(
      container.querySelector("span.nimbus--input__append"),
    ).not.toBeTruthy();
    expect(container.querySelector("svg")).toBeNull();
  });

  it("calls onChange", () => {
    const handleChange = (event: InterfaceNameValue) => {
      expect("myNewValue").toContain(event.value);
    };
    setup({ props: { value: "", onChange: handleChange } });
    const element: HTMLElement = screen.getByRole("textbox");
    userEvent.type(element, "myNewValue");
  });

  it("calls onBlur", () => {
    const handleBlur = (event: InterfaceNameValue) => {
      expect(event.value).toBe("myNewValue");
    };
    setup({ props: { value: "", onBlur: handleBlur } });
    const element: HTMLElement = screen.getByRole("textbox");
    userEvent.type(element, "myNewValue");
    fireEvent.blur(element);
  });

  it("calls onFocus", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    setup({ props: { value: "", onFocus: handleFocus } });
    const element: HTMLElement = screen.getByRole("textbox");
    userEvent.type(element, "myNewValue");
    expect(handleFocus).toHaveBeenCalled();
    /* Textbox does not call handleBlur if it not provided */
    fireEvent.blur(element);
    expect(handleBlur).not.toHaveBeenCalled();
  });
});

describe('<Input type="search" />', () => {
  it("render with value", () => {
    const { container } = setup({ props: { type: "search" } });
    expect(screen.getByRole("searchbox")).toBeTruthy();
    // Search boxes with value renders a button to clear input
    expect(screen.getByRole("button")).toBeTruthy();
    // Search boxes does not render any label
    expect(screen.queryByLabelText("myLabel")).toBeNull();
    expect(screen.getByPlaceholderText("myPlaceholder")).toBeTruthy();
    expect(screen.getByDisplayValue("myValue")).toBeTruthy();
    // Search boxes renders two icons (SearchIcon, CloseIcon)
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });

  it("render without value", () => {
    const { container } = setup({
      Component: (
        <Input
          type="search"
          label="myLabel"
          placeholder="myPlaceholder"
          name="myName"
        />
      ),
    });
    expect(screen.getByRole("searchbox")).toBeTruthy();
    // Search boxes without value renders a button to clear input
    expect(screen.queryByRole("button")).toBeNull();
    // Search boxes does not render any label
    expect(screen.queryByLabelText("myLabel")).toBeNull();
    expect(screen.getByPlaceholderText("myPlaceholder")).toBeTruthy();
    expect(screen.queryByDisplayValue("myValue")).toBeNull();
    // Search boxes without value renders one icon (SearchIcon)
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });
  it("calls onSubmit on Enter", () => {
    const handleSubmit = (event: InterfaceNameValue) => {
      expect(event.value).toBe("myValue");
    };
    setup({ props: { type: "search", onSubmit: handleSubmit } });
    const element: HTMLElement = screen.getByRole("searchbox");
    userEvent.type(element, `{enter}`);
  });

  it("does not call onSubmit on Enter if it not provided", () => {
    const handleSubmit = jest.fn();
    setup({ props: { type: "search" } });
    const element: HTMLElement = screen.getByRole("searchbox");
    userEvent.type(element, `{enter}`);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit on Close", () => {
    const handleSubmit = (event: InterfaceNameValue) => {
      expect(event.value).toBe("");
    };
    setup({ props: { type: "search", onSubmit: handleSubmit } });
    const element: HTMLElement = screen.getByRole("button");
    userEvent.click(element);
  });

  it("does not call onSubmit on Close if it not provided", () => {
    const handleSubmit = jest.fn();
    setup({ props: { type: "search" } });
    const element: HTMLElement = screen.getByRole("button");
    userEvent.click(element);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should throw an error for parameter incompatibility: prependLabel and type="search"', () => {
    try {
      setup({ props: { type: "search", prependLabel: "myPrependLabel" } });
    } catch (error) {
      expect(error.message).toEqual(
        "You can not use parameters 'prependLabel' or 'appendLabel' or 'prependIcon' with type='search'",
      );
    }
  });
});

describe("<Input prependIcon={ArrowRightIcon} />", () => {
  it("render", () => {
    const { container } = setup({ props: { prependIcon: ArrowRightIcon } });
    expect(screen.getByRole("textbox")).toBeTruthy();
    // Textbox does not render any button to clear input
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByLabelText("myLabel")).toBeTruthy();
    expect(screen.getByPlaceholderText("myPlaceholder")).toBeTruthy();
    expect(screen.getByDisplayValue("myValue")).toBeTruthy();
    // Render a one single icon received as parameter
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });
});

describe("<Input prependLabel appendLabel />", () => {
  it("render", () => {
    setup({
      props: { prependLabel: "myPrependLabel", appendLabel: "myAppendLabel" },
    });
    expect(screen.getByRole("textbox")).toBeTruthy();
    // Textbox does not render any button to clear input
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByLabelText("myLabel")).toBeTruthy();
    expect(screen.getByPlaceholderText("myPlaceholder")).toBeTruthy();
    expect(screen.getByDisplayValue("myValue")).toBeTruthy();
    expect(screen.getByText("myPrependLabel")).toBeTruthy();
    expect(screen.getByText("myAppendLabel")).toBeTruthy();
  });
});

describe("<Input prependIcon prependLabel />", () => {
  it("should throw an error for parameter incompatibility: prependLabel and prependIcon", () => {
    try {
      setup({
        props: { prependIcon: ArrowRightIcon, prependLabel: "myAppendLabel" },
      });
    } catch (error) {
      expect(error.message).toEqual(
        "You can not use parameters 'prependLabel' and 'prependIcon' simultaneously",
      );
    }
  });
});

describe("<Input multiRows rows={3} focused />", () => {
  it("render", () => {
    setup({
      props: {
        multiRows: true,
        rows: 3,
        focused: true,
        autoCapitalize: false,
        autoCorrect: false,
      },
    });
    expect(screen.getByRole("textbox")).toHaveProperty("rows", 3);
    expect(screen.getByLabelText("myLabel")).toBeTruthy();
    expect(screen.getByPlaceholderText("myPlaceholder")).toBeTruthy();
    expect(screen.getByDisplayValue("myValue")).toBeTruthy();
  });
});

describe("<Input multiRows rows={3} autoCapitalize autoCorrect />", () => {
  it("render", () => {
    setup({
      props: {
        multiRows: true,
        rows: 3,
        focused: true,
        autoCapitalize: true,
        autoCorrect: true,
      },
    });
    expect(screen.getByRole("textbox")).toHaveProperty("rows", 3);
    expect(screen.getByLabelText("myLabel")).toBeTruthy();
    expect(screen.getByPlaceholderText("myPlaceholder")).toBeTruthy();
    expect(screen.getByDisplayValue("myValue")).toBeTruthy();
  });
});

describe('<Input error="error" />', () => {
  it("render", () => {
    const { container } = setup({
      props: { error: "error" },
    });
    expect(screen.getByRole("textbox")).toBeTruthy();
    expect(screen.getByPlaceholderText("myPlaceholder")).toBeTruthy();
    // Render ExclamationCircleIcon when error is not null
    expect(container.querySelector("span.nimbus--input__append")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
