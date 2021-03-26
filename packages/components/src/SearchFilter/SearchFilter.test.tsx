import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchFilter } from "..";

const myPlaceholder = "myPlaceholder";
const myResultCount = "myResultCount";
const myLabel = "myLabel";
const myAriaLabel = "myAriaLabel";
const myNewValue = "myNewValue";
const myFilters = [
  { id: "id-1", label: "myLabel-1" },
  { id: "id-2", label: "myLabel-2" },
  { id: "id-3", label: "myLabel-3" },
];

describe("<SearchFilter />", () => {
  it("render", () => {
    render(
      <SearchFilter
        placeholder={myPlaceholder}
        resultCount={myResultCount}
        label={myLabel}
        appliedFilters={myFilters}
        onClick={jest.fn()}
        onSubmit={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    const buttonFilter = screen.getByRole("button", { name: myLabel });

    expect(screen.getByRole("searchbox")).toBeTruthy();
    expect(screen.getByPlaceholderText(myPlaceholder)).toBeTruthy();
    expect(buttonFilter).toBeTruthy();
    expect(buttonFilter).toHaveAttribute("aria-label", myLabel);
    myFilters.forEach((filter) =>
      expect(screen.getByRole("button", { name: filter.label })).toBeTruthy(),
    );
    expect(screen.queryAllByRole("button").length).toBe(myFilters.length + 1);
    expect(screen.getByText(myResultCount)).toBeTruthy();
  });

  it("render without appliedFilters", () => {
    render(
      <SearchFilter
        placeholder={myPlaceholder}
        resultCount={myResultCount}
        label={myLabel}
        onClick={jest.fn()}
        onSubmit={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    expect(screen.getByRole("searchbox")).toBeTruthy();
    expect(screen.getByPlaceholderText(myPlaceholder)).toBeTruthy();
    expect(screen.getByRole("button", { name: myLabel })).toBeTruthy();
    expect(screen.queryAllByRole("button").length).toBe(1);
    expect(screen.getByText(myResultCount)).toBeTruthy();
  });

  it("render without Filters Button", () => {
    render(
      <SearchFilter
        placeholder={myPlaceholder}
        resultCount={myResultCount}
        onSubmit={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    expect(screen.getByRole("searchbox")).toBeTruthy();
    expect(screen.getByPlaceholderText(myPlaceholder)).toBeTruthy();
    expect(screen.queryByRole("button")).toBeFalsy();
    expect(screen.getByText(myResultCount)).toBeTruthy();
  });

  it("render without label must have a aria-label value", () => {
    render(
      <SearchFilter
        placeholder={myPlaceholder}
        resultCount={myResultCount}
        ariaLabel={myAriaLabel}
        appliedFilters={myFilters}
        onClick={jest.fn()}
        onSubmit={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    const buttonFilter = screen.getByRole("button", { name: myAriaLabel });
    expect(buttonFilter).toBeTruthy();
    expect(buttonFilter).toHaveAttribute("aria-label", myAriaLabel);
  });

  it("calls onClick when main button is pressed", () => {
    const handleClick = jest.fn();
    render(
      <SearchFilter
        placeholder={myPlaceholder}
        resultCount={myResultCount}
        label={myLabel}
        appliedFilters={myFilters}
        onClick={handleClick}
        onSubmit={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    userEvent.click(screen.getByRole("button", { name: myLabel }));
    expect(handleClick).toHaveBeenCalled();
  });

  it("calls onSubmit when Enter at Input Search", () => {
    const handleSubmit = (value: string) => {
      expect(value).toBe(myNewValue);
    };
    render(
      <SearchFilter
        placeholder={myPlaceholder}
        resultCount={myResultCount}
        label={myLabel}
        appliedFilters={myFilters}
        onClick={jest.fn()}
        onSubmit={handleSubmit}
        onDismiss={jest.fn()}
      />,
    );
    const element: HTMLElement = screen.getByRole("searchbox");
    userEvent.type(element, `${myNewValue}{enter}`);
  });

  it("does not call onSubmit when Close at Input Search", () => {
    const handleSubmit = jest.fn();
    render(
      <SearchFilter
        placeholder={myPlaceholder}
        resultCount={myResultCount}
        label={myLabel}
        appliedFilters={myFilters}
        onClick={jest.fn()}
        onSubmit={handleSubmit}
        onDismiss={jest.fn()}
      />,
    );
    userEvent.type(screen.getByRole("searchbox"), myNewValue);
    userEvent.click(screen.getByRole("button", { name: "" }));
    expect(handleSubmit).not.toHaveBeenCalled();
  });
  it("calls onDismiss when Close at Chips", () => {
    const handleOnDismiss = jest.fn();
    render(
      <SearchFilter
        placeholder={myPlaceholder}
        resultCount={myResultCount}
        label={myLabel}
        appliedFilters={myFilters}
        onClick={jest.fn()}
        onSubmit={jest.fn()}
        onDismiss={handleOnDismiss}
      />,
    );
    myFilters.forEach((filter) =>
      userEvent.click(screen.getByRole("button", { name: filter.label })),
    );
    expect(handleOnDismiss).toHaveBeenCalledTimes(myFilters.length);
  });
});
