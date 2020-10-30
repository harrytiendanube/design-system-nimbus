import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { InfoCircleIcon } from "@tiendanube/icons";
import { Tooltip, Text } from "..";

const myLabelText = "myLabelText";
const myPosition = "top";
const myTooltipText = "myTooltipText";

describe("<Tooltip />", () => {
  it("render with Icon on click", async () => {
    render(
      <Tooltip labelIcon={InfoCircleIcon} position={myPosition}>
        <Text>{myTooltipText}</Text>
      </Tooltip>,
    );
    const tooltipElement = screen.getByRole("tooltip");
    expect(tooltipElement).toBeTruthy();
    fireEvent.click(tooltipElement);
    await screen.findByRole("dialog");
  });
  it("render with Icon on mouse enter", async () => {
    render(
      <Tooltip labelIcon={InfoCircleIcon} position={myPosition}>
        <Text>{myTooltipText}</Text>
      </Tooltip>,
    );
    const tooltipElement = screen.getByRole("tooltip");
    expect(tooltipElement).toBeTruthy();
    fireEvent.mouseEnter(tooltipElement);
    await screen.findByRole("dialog");
  });
  it("render with Label on click", async () => {
    render(
      <Tooltip labelText={myLabelText}>
        <Text>{myTooltipText}</Text>
      </Tooltip>,
    );
    const tooltipElement = screen.getByRole("tooltip");
    expect(tooltipElement).toBeTruthy();
    fireEvent.click(tooltipElement);
    await screen.findByRole("dialog");
  });
  it("render with Label on mouse enter", async () => {
    render(
      <Tooltip labelText={myLabelText}>
        <Text>{myTooltipText}</Text>
      </Tooltip>,
    );
    const tooltipElement = screen.getByRole("tooltip");
    expect(tooltipElement).toBeTruthy();
    fireEvent.mouseEnter(tooltipElement);
    await screen.findByRole("dialog");
  });
});
