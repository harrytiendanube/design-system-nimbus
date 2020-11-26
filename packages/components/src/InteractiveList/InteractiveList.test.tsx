import * as React from "react";
import { render, screen } from "@testing-library/react";

import InteractiveList from ".";

describe("<InteractiveList />", () => {
  it("render ActionItem", () => {
    render(
      <InteractiveList
        addItemLabel="Add a variant"
        onClickAddItem={jest.fn()}
        onChange={jest.fn()}
        mode="action"
        options={[
          {
            title: "Color",
            name: "color",
            labels: [
              { id: "1", label: "pink", colorTag: "#E68CFA" },
              { id: "2", label: "black", colorTag: "#000000" },
            ],
          },
        ]}
      />,
    );
    const element: HTMLElement = screen.getByText("Add a variant");
    expect(element).toBeTruthy();
  });

  it("render check", () => {
    render(
      <InteractiveList
        addItemLabel="Add a variant"
        onClickAddItem={jest.fn()}
        onChange={jest.fn()}
        mode="multi"
        options={[
          {
            title: "Shirts",
            name: "shirts",
            active: true,
          },
          {
            title: "Pants",
            name: "pants",
          },
          {
            title: "Shoes",
            name: "shoes",
          },
        ]}
      />,
    );
    const element: HTMLElement = screen.getByText("Add a variant");
    expect(element).toBeTruthy();
  });

  it("render radio", () => {
    render(
      <InteractiveList
        addItemLabel="Add a variant"
        onClickAddItem={jest.fn()}
        onChange={jest.fn()}
        mode="single"
        options={[
          {
            title: "Limited",
            name: "limited",
            active: true,
          },
          {
            title: "Unlimited",
            name: "unlimited",
          },
        ]}
      />,
    );
    const element: HTMLElement = screen.getByText("Add a variant");
    expect(element).toBeTruthy();
  });
});
