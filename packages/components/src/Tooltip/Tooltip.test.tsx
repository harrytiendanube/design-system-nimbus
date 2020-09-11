import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InfoCircleIcon } from "@tiendanube/icons";
import { Tooltip, Text } from "..";

const myName = "myName";
const myLabelText = "myLabelText";
const myPosition = "top";
const myTooltipText = "myTooltipText";

describe("<Tooltip />", () => {
  it("render", () => {
    const { container } = render(
      <Tooltip
        name={myName}
        labelIcon={InfoCircleIcon}
        labelText={myLabelText}
        position={myPosition}
      >
        <Text>{myTooltipText}</Text>
      </Tooltip>,
    );

    expect(screen.getByRole("tooltip")).toBeTruthy();
    expect(screen.getByRole("button", { name: myLabelText })).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });
  it("render without labelIcon nor position", () => {
    const { container } = render(
      <Tooltip name={myName} labelText={myLabelText}>
        <Text>{myTooltipText}</Text>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip")).toBeTruthy();
    expect(screen.getByRole("button", { name: myLabelText })).toBeTruthy();
    expect(container.querySelector("svg")).toBeFalsy();
  });

  it("render label on click (mobile) button", () => {
    render(
      <Tooltip name={myName} labelIcon={InfoCircleIcon} labelText={myLabelText}>
        <Text>{myTooltipText}</Text>
      </Tooltip>,
    );
    fireEvent.click(screen.getByRole("button", { name: myLabelText }));
    expect(screen.getByText(myTooltipText)).toBeTruthy();
  });

  it("render label on click (desktop) button", () => {
    render(
      <Tooltip name={myName} labelIcon={InfoCircleIcon} labelText={myLabelText}>
        <Text>{myTooltipText}</Text>
      </Tooltip>,
    );
    userEvent.click(screen.getByRole("button", { name: myLabelText }));
    expect(screen.getByText(myTooltipText)).toBeTruthy();
  });

  it("render label on hover and remove on unhover", () => {
    render(
      <Tooltip name={myName} labelIcon={InfoCircleIcon} labelText={myLabelText}>
        <Text>{myTooltipText}</Text>
      </Tooltip>,
    );
    userEvent.hover(screen.getByRole("tooltip"));
    expect(screen.getByText(myTooltipText)).toBeTruthy();
    userEvent.click(screen.getByRole("tooltip"));
    expect(screen.getByText(myTooltipText)).toBeTruthy();
    userEvent.unhover(screen.getByRole("tooltip"));
    expect(screen.queryByText(myTooltipText)).toBeFalsy();
  });
});
