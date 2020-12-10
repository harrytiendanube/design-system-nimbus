/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockIsIntersecting } from "../common/test-utils";
import { Page, Text } from "..";

const PageComponent = (props: any) => (
  <Page
    title="myTitle"
    headerNavigation={{
      type: "back",
      action: {
        onClick: jest.fn(),
        children: "Back",
      },
    }}
    paginationPrevious={jest.fn()}
    paginationNext={jest.fn()}
    headerAction={{
      onClick: jest.fn(),
      children: "Header action",
    }}
    primaryAction={{
      onClick: jest.fn(),
      children: "Primary action",
    }}
    secondaryActions={[
      {
        children: "Secondary action 1",
        onClick: jest.fn(),
      },
      {
        children: "Secondary action 2",
        onClick: jest.fn(),
      },
    ]}
    headerLabels={[
      {
        id: "label-id-1",
        label: "label 1",
      },
      {
        id: "label-id-2",
        label: "label 2",
      },
    ]}
    {...props}
  >
    <Text>Page content</Text>
  </Page>
);

const setup = ({ Component, props }: any) => {
  const { container } = render(Component || <PageComponent {...props} />);
  return { container };
};

describe("<Page /> on Desktop", () => {
  it("renders", () => {
    const { container } = setup({ props: {} });
    expect(
      screen.getByRole("button", {
        name: "Back",
      }),
    );
    expect(screen.queryByRole("button", { name: "Header action" })).toBeFalsy();
    expect(screen.getByRole("button", { name: "Primary action" }));
    expect(container.querySelectorAll("a").length).toEqual(
      4, // 2 Secondary Action + 1 Previous Action + 1 Next Action
    );
    expect(screen.getByRole("heading", { name: "myTitle" }));
    expect(screen.queryAllByRole("status").length).toEqual(2);
  });

  it("renders with menu", () => {
    const { container } = setup({
      props: {
        headerLeftAction: {
          type: "menu",
          action: {
            onClick: jest.fn(),
          },
        },
      },
    });
    expect(screen.queryByRole("button", { name: "Header action" })).toBeFalsy();
    expect(screen.getByRole("button", { name: "Primary action" }));
    expect(container.querySelectorAll("a").length).toEqual(
      4, // 2 Secondary Action + 1 Previous Action + 1 Next Action
    );
    expect(screen.getByRole("heading", { name: "myTitle" }));
    expect(screen.queryAllByRole("status").length).toEqual(2);
  });

  it("renders with optional parameters", () => {
    setup({
      Component: (
        <Page title="myTitle">
          <Text>Page content</Text>
        </Page>
      ),
    });
    expect(
      screen.queryByRole("button", {
        name: "Back",
      }),
    ).toBeFalsy();
    expect(screen.queryByRole("button", { name: "" })).toBeFalsy();
    expect(screen.queryByRole("button", { name: "Header action" })).toBeFalsy();
    expect(
      screen.queryByRole("button", { name: "Primary action" }),
    ).toBeFalsy();

    expect(
      screen.queryByRole("button", { name: "Secondary action 1" }),
    ).toBeFalsy();
    expect(
      screen.queryByRole("button", { name: "Secondary action 2" }),
    ).toBeFalsy();

    expect(screen.getByRole("heading", { name: "myTitle" }));
    expect(screen.queryByRole("status")).toBeFalsy();
  });

  it("renders skeletons", () => {
    const props = {
      title: "skeleton",
      primaryAction: "skeleton",
      secondaryActions: ["skeleton", "skeleton"],
      headerLabels: ["skeleton", "skeleton"],
    };
    const { container } = setup({ props });
    expect(
      container.querySelector(".nimbus--page-title-skeleton"),
    ).toBeTruthy();
    expect(container.querySelectorAll(".nimbus--button-skeleton")).toHaveLength(
      1,
    );
    expect(container.querySelectorAll(".nimbus--label-skeleton")).toHaveLength(
      2,
    );
  });
});

describe("<Page/> on Mobile", () => {
  it("renders", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 671,
    });
    const { container } = setup({ props: {} });

    expect(
      screen.getByRole("button", {
        name: "Back",
      }),
    );
    expect(screen.getByRole("heading", { name: "myTitle" }));
    expect(screen.queryAllByRole("status").length).toEqual(2);

    // No actions renders before button pressed
    expect(screen.getByText("Header action"));
    expect(
      screen.queryByRole("button", { name: "Primary action" }),
    ).toBeFalsy();
    expect(
      screen.queryByRole("button", { name: "Secondary action 1" }),
    ).toBeFalsy();
    expect(
      screen.queryByRole("button", { name: "Secondary action 2" }),
    ).toBeFalsy();

    // Renders actions after button pressed
    userEvent.click(container.querySelectorAll("a")[1]);
    expect(container.querySelectorAll("a").length).toEqual(
      7, // 2 secondaryActions + 1 PrimaryAction + 1 Previous Action + 1 Next Action + 1 Header Action + 1 Menu Top right
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
