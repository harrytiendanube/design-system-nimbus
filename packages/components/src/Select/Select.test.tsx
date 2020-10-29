import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Select from ".";
import { InterfaceNameValue } from "../common/interfaces";

const myPlaceholder = "myPlaceholder";
const myLabel = "myLabel";
const myName = "myName";
const myOptions = [
  { label: "Option 1", value: "Value 1" },
  { label: "Option 2", value: "Value 2" },
  { label: "Option 3", value: "Value 3" },
  { label: "Option 4", value: "Value 4", disabled: true },
];
const myValue = myOptions[0].value;

const myOptionsGroups = [
  {
    group: "A",
    options: [
      { label: "Option 1", value: "Value 1" },
      { label: "Option 2", value: "Value 2" },
    ],
  },
  {
    group: "B",
    options: [
      { label: "Option 3", value: "Value 3" },
      { label: "Option 4", value: "Value 4" },
    ],
  },
];
const myOptionsValue = myOptionsGroups[0].options[0].value;

describe("<Select />", () => {
  it("renders", () => {
    render(
      <Select
        label={myLabel}
        name={myName}
        value={myValue}
        placeholder={myPlaceholder}
        options={myOptions}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByRole("combobox", { name: myLabel })).toHaveValue(
      myValue,
    );
    expect(screen.getByRole("option", { name: myPlaceholder })).toBeTruthy();
    myOptions.map((option) =>
      expect(screen.getByRole("option", { name: option.label })).toBeTruthy(),
    );
    expect(
      screen.getByRole("option", { name: myOptions[3].label }),
    ).toHaveAttribute("disabled");
  });

  it("renders without optional parameters", () => {
    render(<Select name={myName} options={myOptions} onChange={jest.fn()} />);
    expect(screen.getByRole("combobox", { name: "" }));
    expect(screen.queryByRole("option", { name: myPlaceholder })).toBeFalsy();
    myOptions.map((option) =>
      expect(screen.getByRole("option", { name: option.label })).toBeTruthy(),
    );
  });

  it("renders with Groups", () => {
    const { container } = render(
      <Select
        label={myLabel}
        name={myName}
        value={myOptionsValue}
        placeholder={myPlaceholder}
        options={myOptionsGroups}
        onChange={jest.fn()}
      />,
    );
    expect(screen.getByRole("combobox", { name: myLabel })).toHaveValue(
      myValue,
    );
    expect(screen.getByRole("option", { name: myPlaceholder })).toBeTruthy();
    container
      .querySelectorAll("optgroup")
      .forEach((opt, index) =>
        expect(opt).toHaveAttribute("label", myOptionsGroups[index].group),
      );
    myOptionsGroups.forEach((group) =>
      group.options.forEach((option) =>
        expect(screen.getByRole("option", { name: option.label })).toBeTruthy(),
      ),
    );
  });

  it("calls onChange", () => {
    const handleChange = (event: InterfaceNameValue) => {
      expect(event.value).toBe(myOptions[1].value);
    };
    render(
      <Select name={myName} options={myOptions} onChange={handleChange} />,
    );
    const select: HTMLElement = screen.getByRole("combobox");
    const option: HTMLElement = screen.getByRole("option", {
      name: myOptions[1].label,
    });
    userEvent.selectOptions(select, [option]);
  });
});
