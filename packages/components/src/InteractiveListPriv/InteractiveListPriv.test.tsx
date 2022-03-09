import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckCircleIcon } from "@tiendanube/icons";

import InteractiveListPriv from ".";

describe("<InteractiveListPriv />", () => {
  it("render ActionItem and calls onChange", () => {
    const handleAddItem = jest.fn();
    const handleChange = jest.fn();
    render(
      <InteractiveListPriv
        addItemLabel="Add a variant"
        onClickAddItem={handleAddItem}
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
          onChange={handleChange}
        />
        <InteractiveListPriv.ActionItem
          title="Size"
          name="size"
          labels={[
            { id: "1", label: "S" },
            { id: "2", label: "XS" },
          ]}
          onChange={handleChange}
        />
        <InteractiveListPriv.ActionItem
          title="Variant"
          name="variant"
          description="description"
          onChange={handleChange}
        />
      </InteractiveListPriv>,
    );

    expect(screen.getByRole("list")).toHaveClass("nimbus--interactive-list");
    expect(screen.queryAllByRole("listitem")).toHaveLength(3);
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

  it("render CheckItem and calls onChange", () => {
    const handleChange = jest.fn();
    render(
      <InteractiveListPriv>
        <InteractiveListPriv.CheckItem
          title="Shirts"
          name="shirts"
          checked
          onChange={handleChange}
        />
        <InteractiveListPriv.CheckItem
          title="Pants"
          name="pants"
          onChange={handleChange}
        />
        <InteractiveListPriv.CheckItem
          title="Shoes"
          name="shoes"
          onChange={handleChange}
        />
      </InteractiveListPriv>,
    );
    expect(screen.getByRole("list")).toHaveClass("nimbus--interactive-list");
    expect(screen.queryAllByRole("listitem")).toHaveLength(3);

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

  it("render RadioItem and calls onChange", () => {
    const handleChange = jest.fn();
    render(
      <InteractiveListPriv>
        <InteractiveListPriv.RadioItem
          title="Limited"
          value="limited"
          onChange={handleChange}
        />
        <InteractiveListPriv.RadioItem
          title="Unlimited"
          value="unlimited"
          onChange={handleChange}
          checked
        />
      </InteractiveListPriv>,
    );
    expect(screen.getByRole("list")).toHaveClass("nimbus--interactive-list");
    expect(screen.queryAllByRole("listitem")).toHaveLength(2);

    const radioLimited = screen.getByRole("radio", {
      name: "Limited",
    });
    const radioUnlimited = screen.getByRole("radio", {
      name: "Unlimited",
    });
    userEvent.click(radioLimited);
    userEvent.click(radioUnlimited);
    expect(handleChange).toBeCalledTimes(1);
  });

  it("should throw an error for parameter incompatibility: description and labels", () => {
    try {
      render(
        <InteractiveListPriv>
          <InteractiveListPriv.ActionItem
            title="Color"
            name="color"
            description="Color"
            labels={[{ id: "1", label: "pink", colorTag: "#E68CFA" }]}
            onChange={jest.fn()}
          />
        </InteractiveListPriv>,
      );
    } catch (error) {
      expect(error.message).toEqual(
        "You can not use parameters 'description' and 'labels' simultaneously",
      );
    }
  });

  it("render all Items as skeleton", () => {
    const { container } = render(
      <InteractiveListPriv addItemLabel="Add a variant" skeleton>
        <InteractiveListPriv.ActionItem
          title="other"
          name="other"
          labels={[{ id: "1", label: "other" }]}
          onChange={jest.fn()}
          skeleton
        />
        <InteractiveListPriv.ActionItem
          title="another"
          name="anther"
          description="another"
          onChange={jest.fn()}
          skeleton
        />
        <InteractiveListPriv.CheckItem
          title="other"
          name="other"
          onChange={jest.fn()}
          skeleton
        />
        <InteractiveListPriv.RadioItem
          title="other"
          value="other"
          skeleton
          onChange={jest.fn()}
        />
      </InteractiveListPriv>,
    );
    expect(container.querySelectorAll(".nimbus--link-skeleton")).toHaveLength(
      1,
    );
    expect(container.querySelectorAll(".nimbus--label-skeleton")).toHaveLength(
      1,
    );
    expect(container.querySelectorAll(".nimbus--text-skeleton")).toHaveLength(
      5,
    );
  });

  it("render Items with success label tag", () => {
    const { container } = render(
      <InteractiveListPriv>
        <InteractiveListPriv.ActionItem
          title="other"
          name="other"
          labels={[{ id: "1", label: "other", appearance: "success" }]}
          onChange={jest.fn()}
        />
      </InteractiveListPriv>,
    );
    expect(container.querySelectorAll(".nimbus--label--success")).toHaveLength(
      1,
    );
  });

  it("render Interactivelist with disabled props where onChange doesn't have to work", () => {
    const handleChange = jest.fn();
    render(
      <InteractiveListPriv>
        <InteractiveListPriv.ActionItem
          title="option"
          name="other"
          onChange={handleChange}
          disabled
        />
        <InteractiveListPriv.RadioItem
          title="radio1"
          value="radio"
          onChange={handleChange}
          disabled
        />
        <InteractiveListPriv.CheckItem
          title="checkbox"
          name="checkbox"
          onChange={handleChange}
          disabled
        />
      </InteractiveListPriv>,
    );

    const button = screen.getByRole("button", {
      name: "option",
    });
    const checkbox = screen.getByRole("checkbox", {
      name: "checkbox",
    });
    const radioButton = screen.getByRole("radio", {
      name: "radio1",
    });

    userEvent.click(button);
    userEvent.click(checkbox);
    userEvent.click(radioButton);
    expect(handleChange).toBeCalledTimes(0);
  });

  it("render items with Icons", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <InteractiveListPriv>
        <InteractiveListPriv.ActionItem
          title="item"
          name="item"
          onChange={handleChange}
          icon={CheckCircleIcon}
          iconAppearance="danger"
        />
      </InteractiveListPriv>,
    );
    expect(screen.getByRole("list")).toHaveClass("nimbus--interactive-list");
    expect(
      container.querySelectorAll(".nimbus--icon-item__icon--danger"),
    ).toBeTruthy();
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });
});
