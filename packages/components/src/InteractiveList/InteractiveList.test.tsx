import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InteractiveList from ".";

describe("<InteractiveList />", () => {
  it("render ActionItem", () => {
    const handleAddItem = jest.fn();
    const handleChange = jest.fn();
    render(
      <InteractiveList
        addItemLabel="Add a variant"
        onClickAddItem={handleAddItem}
        onChange={handleChange}
        options={[
          {
            title: "Color",
            name: "color",
            labels: [
              { id: "1", label: "pink", colorTag: "#E68CFA" },
              { id: "2", label: "black", colorTag: "#000000" },
              { id: "3", label: "red", colorTag: "#ff0000" },
              { id: "4", label: "blue", colorTag: "#027cdc" },
            ],
          },
          {
            title: "Size",
            name: "size",
            labels: [
              { id: "1", label: "S" },
              { id: "2", label: "XS" },
            ],
          },
          {
            title: "Variant",
            name: "Variant",
            description: "description",
          },
        ]}
      />,
    );
    expect(screen.getByRole("list")).toHaveClass("nimbus--interactive-list");
    const buttonColor = screen.getByRole("button", {
      name: "Color pink black red blue",
    });
    const buttonSize = screen.getByRole("button", { name: "Size S XS" });
    const buttonVariant = screen.getByRole("button", {
      name: "Variant description",
    });
    const linkAddVariant = screen.getByText("Add a variant");
    userEvent.click(buttonColor);
    userEvent.click(buttonSize);
    userEvent.click(buttonVariant);
    userEvent.click(linkAddVariant);
    expect(handleChange).toBeCalledTimes(3);
    expect(handleAddItem).toBeCalledTimes(1);
  });

  it("render CheckItem", () => {
    const handleChange = jest.fn();
    render(
      <InteractiveList
        onChange={handleChange}
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
    expect(screen.getByRole("list")).toHaveClass("nimbus--interactive-list");
    const checkShirts = screen.getByRole("checkbox", {
      name: "Shirts",
    });
    const checkPants = screen.getByRole("checkbox", {
      name: "Pants",
    });
    const checkShoes = screen.getByRole("checkbox", {
      name: "Shoes",
    });
    userEvent.click(checkShirts);
    userEvent.click(checkPants);
    userEvent.click(checkShoes);
    expect(handleChange).toBeCalledTimes(3);
  });

  it("render RadioItem", () => {
    const handleChange = jest.fn();
    render(
      <InteractiveList
        addItemLabel="Add a variant"
        onChange={handleChange}
        mode="single"
        options={[
          {
            title: "Limited",
            name: "limited",
          },
          {
            title: "Unlimited",
            name: "unlimited",
          },
        ]}
      />,
    );
    expect(screen.getByRole("list")).toHaveClass("nimbus--interactive-list");
    const radioLimited = screen.getByRole("radio", {
      name: "Limited",
    });
    const radioUnlimited = screen.getByRole("radio", {
      name: "Unlimited",
    });
    userEvent.click(radioLimited);
    userEvent.click(radioUnlimited);
    expect(handleChange).toBeCalledTimes(2);
  });

  it("render options with no border bottom", () => {
    const handleChange = jest.fn();

    const { container } = render(
      <InteractiveList
        addItemLabel="Add a variant"
        onChange={handleChange}
        mode="single"
        options={[
          {
            title: "Limited",
            name: "limited",
          },
          {
            title: "Unlimited",
            name: "unlimited",
            hideBorder: true,
          },
        ]}
      />,
    );

    expect(
      container.querySelectorAll(
        ".nimbus--interactive-list-item__borderBottom",
      ),
    ).toHaveLength(1);
  });
});
