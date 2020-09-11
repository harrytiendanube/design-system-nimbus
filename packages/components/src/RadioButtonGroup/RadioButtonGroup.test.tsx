import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RadioButtonGroup from ".";
import {
  InterfaceNameValue,
  InterfaceRadioButtonOption,
} from "../common/interfaces";

const myLabelGroup = "myLabelGroup";
const myName = "myName";

const myOpt: InterfaceRadioButtonOption[] = [
  { label: "myLabel 1", value: "myValue 1" },
  { label: "myLabel 2", value: "myValue 2", disabled: false },
  { label: "myLabel 3", value: "myValue 3", disabled: true },
];

describe("<RadioButtonGroup />", () => {
  it("render", () => {
    render(
      <RadioButtonGroup
        label={myLabelGroup}
        name={myName}
        value={myOpt[0].value}
        options={myOpt}
      />,
    );
    const e1: HTMLElement = screen.getByRole("radio", { name: myOpt[0].label });
    const e2: HTMLElement = screen.getByRole("radio", { name: myOpt[1].label });
    const e3: HTMLElement = screen.getByRole("radio", { name: myOpt[2].label });
    expect(e1).toHaveProperty("disabled", false);
    expect(e1).toHaveProperty("checked", true);
    expect(e2).toHaveProperty("disabled", false);
    expect(e2).toHaveProperty("checked", false);
    expect(e3).toHaveProperty("disabled", true);
    expect(e3).toHaveProperty("checked", false);
    expect(screen.getByText(myLabelGroup)).toBeTruthy();
  });

  it("render without label nor value", () => {
    render(<RadioButtonGroup name={myName} options={myOpt} />);
    myOpt.forEach((opt) =>
      expect(screen.getByRole("radio", { name: opt.label })).toHaveProperty(
        "checked",
        false,
      ),
    );
    expect(screen.queryByText(myLabelGroup)).toBeFalsy();
  });

  it("calls onChange", () => {
    const handleChange = (event: InterfaceNameValue) => {
      expect(myOpt[1].value).toContain(event.value);
    };
    render(
      <RadioButtonGroup
        label={myLabelGroup}
        name={myName}
        value={myOpt[0].value}
        options={myOpt}
        onChange={handleChange}
      />,
    );

    const element: HTMLElement = screen.getByRole("radio", {
      name: myOpt[1].label,
    });
    userEvent.click(element);
  });

  it("does not calls onChange if it not provided", () => {
    render(
      <RadioButtonGroup
        label={myLabelGroup}
        name={myName}
        value={myOpt[0].value}
        options={myOpt}
      />,
    );
    const element: HTMLElement = screen.getByRole("radio", {
      name: myOpt[1].label,
    });
    userEvent.click(element);
  });
});
