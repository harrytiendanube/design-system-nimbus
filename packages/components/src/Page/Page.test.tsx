import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockIsIntersecting } from "../common/test-utils";
import { Page, Text } from "..";

const myTitle = "myTitle";
const myPageTextContent = "Page content";
const myBackNavigation = {
  onClick: jest.fn(),
  children: "Back",
};
const myPaginationPrevious = jest.fn();
const myPaginationNext = jest.fn();
const myEditAction = {
  onClick: jest.fn(),
  children: "Edit action",
};
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
  {
    id: "label-id-2",
    label: "label 2",
  },
];

describe("<Page /> on Desktop", () => {
  it("renders", () => {
    render(
      <Page
        title={myTitle}
        backNavigation={myBackNavigation}
        paginationPrevious={myPaginationPrevious}
        paginationNext={myPaginationNext}
        editAction={myEditAction}
        primaryAction={myPrimaryAction}
        secondaryActions={mySecondaryActions}
        headerLabels={myHeaderLabels}
      >
        <Text>{myPageTextContent}</Text>
      </Page>,
    );

    expect(screen.getByRole("button", { name: myBackNavigation.children }));
    expect(screen.queryAllByRole("button", { name: "" })).toHaveLength(2);
    expect(
      screen.queryByRole("button", { name: myEditAction.children }),
    ).toBeFalsy();
    expect(screen.getByRole("button", { name: myPrimaryAction.children }));
    mySecondaryActions.forEach((action) =>
      expect(screen.getByRole("button", { name: action.children })),
    );
    expect(screen.getByRole("heading", { name: myTitle }));
    myHeaderLabels.forEach((label, index) =>
      expect(screen.queryAllByRole("status")[index].innerHTML).toEqual(
        label.label,
      ),
    );
  });

  it("renders with optional parameters", () => {
    render(
      <Page title={myTitle}>
        <Text>{myPageTextContent}</Text>
      </Page>,
    );

    expect(
      screen.queryByRole("button", { name: myBackNavigation.children }),
    ).toBeFalsy();
    expect(screen.queryByRole("button", { name: "" })).toBeFalsy();
    expect(
      screen.queryByRole("button", { name: myEditAction.children }),
    ).toBeFalsy();
    expect(
      screen.queryByRole("button", { name: myPrimaryAction.children }),
    ).toBeFalsy();
    mySecondaryActions.forEach((action) =>
      expect(
        screen.queryByRole("button", { name: action.children }),
      ).toBeFalsy(),
    );
    expect(screen.getByRole("heading", { name: myTitle }));
    expect(screen.queryByRole("status")).toBeFalsy();
  });

  it("renders skeletons", () => {
    const { container } = render(
      <Page
        title="skeleton"
        backNavigation={myBackNavigation}
        paginationPrevious={myPaginationPrevious}
        paginationNext={myPaginationNext}
        editAction={myEditAction}
        primaryAction="skeleton"
        secondaryActions={["skeleton", "skeleton"]}
        headerLabels={["skeleton", "skeleton"]}
      >
        <Text.Skeleton />
      </Page>,
    );
    expect(
      container.querySelector(".nimbus--page-title-skeleton"),
    ).toBeTruthy();
    expect(container.querySelectorAll(".nimbus--button-skeleton")).toHaveLength(
      3,
    );
    expect(container.querySelectorAll(".nimbus--label-skeleton")).toHaveLength(
      2,
    );
    expect(
      container.querySelector(".nimbus--text-skeleton--medium"),
    ).toBeTruthy();
  });
});

describe("<Page/> on Mobile", () => {
  it("renders", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 671,
    });
    const { container } = render(
      <Page
        title={myTitle}
        backNavigation={myBackNavigation}
        paginationPrevious={myPaginationPrevious}
        paginationNext={myPaginationNext}
        editAction={myEditAction}
        primaryAction={myPrimaryAction}
        secondaryActions={mySecondaryActions}
        headerLabels={myHeaderLabels}
      >
        <Text>{myPageTextContent}</Text>
      </Page>,
    );

    expect(screen.getByRole("button", { name: myBackNavigation.children }));
    expect(screen.queryAllByRole("button", { name: "" })).toHaveLength(3);
    expect(screen.getByRole("heading", { name: myTitle }));
    myHeaderLabels.forEach((label, index) => {
      return expect(screen.queryAllByRole("status")[index].innerHTML).toEqual(
        label.label,
      );
    });

    // No actions renders before button pressed
    expect(screen.getByRole("button", { name: myEditAction.children }));
    expect(
      screen.queryByRole("button", { name: myPrimaryAction.children }),
    ).toBeFalsy();
    mySecondaryActions.forEach((action) =>
      expect(
        screen.queryAllByRole("button", { name: action.children }),
      ).toHaveLength(0),
    );

    // Renders actions after button pressed
    userEvent.click(screen.queryAllByRole("button", { name: "" })[0]);
    expect(screen.getByRole("button", { name: myPrimaryAction.children }));
    mySecondaryActions.forEach((action) =>
      expect(screen.getByRole("button", { name: action.children })),
    );

    const header = container.querySelector("#header");

    // Shows Title on header when is not intersecting with Title on body
    mockIsIntersecting(header as Element, false);
    expect(container.querySelectorAll("div")[2]).toHaveClass(
      "nimbus--page-navbar is-scrolled",
    );

    // Does not show Title on header when is intersecting with Title on body
    mockIsIntersecting(header as Element, true);
    expect(container.querySelectorAll("div")[2]).toHaveClass(
      "nimbus--page-navbar",
    );
  });
});
