import * as React from "react";
import { render, screen } from "@testing-library/react";

import { Page, Text } from "..";

const myTitle = "myTitle";
const myPageTextContent = "Page content";
const myBackNavigation = {
  onClick: jest.fn(),
  children: "Back",
};
const myPaginationPrevious = jest.fn();
const myPaginationNext = jest.fn();
const myPrimaryAction = {
  onClick: jest.fn(),
  children: "Primary action",
};
const mySecondaryActions = [
  {
    children: "Secondary action 1",
    onClick: jest.fn(),
  },
  {
    children: "Secondary action 2",
    onClick: jest.fn(),
  },
];
const myHeaderLabels = [
  {
    id: "label-id-1",
    label: "label 1",
  },
];

describe("<Page />", () => {
  it("render", () => {
    render(
      <Page
        title={myTitle}
        backNavigation={myBackNavigation}
        paginationPrevious={myPaginationPrevious}
        paginationNext={myPaginationNext}
        primaryAction={myPrimaryAction}
        secondaryActions={mySecondaryActions}
        headerLabels={myHeaderLabels}
      >
        <Text>{myPageTextContent}</Text>
      </Page>,
    );
    expect(screen.getByRole("button", { name: myBackNavigation.children }));
    expect(screen.queryAllByRole("button", { name: "" })).toHaveLength(2);
    expect(screen.getByRole("button", { name: myPrimaryAction.children }));
    mySecondaryActions.forEach((action) =>
      expect(screen.getByRole("button", { name: action.children })),
    );
    expect(screen.getByRole("heading", { name: myTitle }));
    expect(screen.getByRole("status"));
  });
});
