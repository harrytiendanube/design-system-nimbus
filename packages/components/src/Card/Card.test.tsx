import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CreditCardIcon, PrinterIcon } from "@tiendanube/icons";
import { Card, Text } from "..";

const myTitle = "myTitle";
const myText = "myText";
const myPrimaryLabel = "myPrimaryLabel";
const mySecondaryLabel = "mySecondaryLabel";
const myHeaderLabel = "myHeaderLabel";

describe("<Card />", () => {
  it("render with Label", () => {
    render(
      <Card
        title={myTitle}
        primaryButton={{
          children: myPrimaryLabel,
          onClick: jest.fn(),
        }}
        secondaryButton={{
          children: mySecondaryLabel,
          onClick: jest.fn(),
        }}
        headerLabel={{
          id: "header-label-id",
          label: myHeaderLabel,
          appearance: "warning",
          icon: CreditCardIcon,
        }}
      >
        <Text>{myText}</Text>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByRole("button", { name: myPrimaryLabel })).toBeTruthy();
    expect(screen.getByRole("button", { name: mySecondaryLabel })).toBeTruthy();
    expect(screen.getByText(myText)).toBeTruthy();
    expect(screen.getByText(myHeaderLabel)).toBeTruthy();
  });
  it("render with Icon and calls onClickHeaderIcon if its provided", () => {
    const handleClickHeaderIcon = jest.fn();
    render(
      <Card
        title={myTitle}
        headerIcon={PrinterIcon}
        onClickHeaderIcon={handleClickHeaderIcon}
      >
        <Text>{myText}</Text>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.getByText(myText)).toBeTruthy();
    userEvent.click(screen.getByRole("button", { name: myTitle }));
    expect(handleClickHeaderIcon).toHaveBeenCalled();
  });

  it("render with Icon and collapsible", () => {
    const { container } = render(
      <Card title={myTitle} headerIcon={PrinterIcon} isCollapsible>
        <Text>{myText}</Text>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.getByText(myText)).toBeTruthy();
    // At the beginning it should show closed
    expect(container.querySelectorAll(".is-open")).toHaveLength(0);
    userEvent.click(screen.getByRole("button", { name: "Expand" }));
    // After clicked on button, it should show open
    expect(container.querySelectorAll(".is-open")).toHaveLength(2);
  });

  it("render skeletons", () => {
    const { container } = render(
      <Card
        title={myTitle}
        primaryButton="skeleton"
        secondaryButton="skeleton"
        headerLabel="skeleton"
      >
        <Text.Skeleton />
      </Card>,
    );
    expect(container.querySelector(".nimbus--label-skeleton")).toBeTruthy();
    expect(
      container.querySelector(".nimbus--text-skeleton--width-medium"),
    ).toBeTruthy();
    expect(container.querySelectorAll(".nimbus--button-skeleton")).toHaveLength(
      2,
    );
  });
});
