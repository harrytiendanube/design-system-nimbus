import * as React from "react";
import { render, screen } from "@testing-library/react";

import InteractiveListPriv from ".";

describe("<InteractiveListPriv />", () => {
  it("render ActionItem", () => {
    render(
      <InteractiveListPriv
        addItemLabel="Add a variant"
        onClickAddItem={jest.fn()}
      >
        <InteractiveListPriv.ActionItem
          title="Color"
          name="color"
          labels={[
            { id: "1", label: "pink", colorTag: "#E68CFA" },
            { id: "2", label: "black", colorTag: "#000000" },
            { id: "3", label: "red", colorTag: "#ff0000" },
            { id: "4", label: "blue", colorTag: "#027cdc" },
          ]}
          onChange={jest.fn()}
        />
        <InteractiveListPriv.ActionItem
          title="Size"
          name="size"
          labels={[
            { id: "1", label: "S" },
            { id: "2", label: "XS" },
          ]}
          onChange={jest.fn()}
        />
        <InteractiveListPriv.ActionItem
          title="Variant"
          name="variant"
          description="description"
          onChange={jest.fn()}
        />
      </InteractiveListPriv>,
    );
    const element: HTMLElement = screen.getByText("Add a variant");
    expect(element).toBeTruthy();
  });

  it("render check", () => {
    render(
      <InteractiveListPriv
        addItemLabel="Add a variant"
        onClickAddItem={jest.fn()}
      >
        <InteractiveListPriv.CheckItem
          title="Shirts"
          name="shirts"
          checked
          onChange={jest.fn()}
        />
        <InteractiveListPriv.CheckItem
          title="Pants"
          name="pants"
          onChange={jest.fn()}
        />
        <InteractiveListPriv.CheckItem
          title="Shoes"
          name="shoes"
          onChange={jest.fn()}
        />
      </InteractiveListPriv>,
    );
    const element: HTMLElement = screen.getByText("Add a variant");
    expect(element).toBeTruthy();
  });

  it("render radio", () => {
    render(
      <InteractiveListPriv
        addItemLabel="Add a variant"
        onClickAddItem={jest.fn()}
      >
        <InteractiveListPriv.RadioItem
          title="Limited"
          value="limited"
          checked
          onChange={jest.fn()}
        />
        <InteractiveListPriv.RadioItem
          title="Unlimited"
          value="unlimited"
          onChange={jest.fn()}
        />
      </InteractiveListPriv>,
    );
    const element: HTMLElement = screen.getByText("Add a variant");
    expect(element).toBeTruthy();
  });
});
