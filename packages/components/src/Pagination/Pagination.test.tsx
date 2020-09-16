import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from ".";

const myPageTotal = 12;
const myPageSelected = 1;
const myHasMorePages = true;
const myMargin = 1;
const myPadding = 2;
let handlePageSelected: jest.Mock;

const classSelected = "nimbus--button--secondary";
const classUnSelected = "nimbus--button--default";

describe("<Pagination /> (only end margin)", () => {
  beforeEach(() => {
    handlePageSelected = jest.fn((page: number) => page);
    render(
      <Pagination
        pageTotal={myPageTotal}
        pageSelected={myPageSelected}
        hasMorePages={myHasMorePages}
        margin={myMargin}
        padding={myPadding}
        onPageSelect={handlePageSelected}
      />,
    );
  });
  it(`renders with page ${myPageSelected} selected`, () => {
    // global pagination component
    expect(screen.getByRole("navigation")).toBeTruthy();
    // prev button must be disabled
    expect(screen.queryAllByRole("button", { name: "" })[0]).toHaveProperty(
      "disabled",
      true,
    );
    // next button must be enabled
    expect(screen.queryAllByRole("button", { name: "" })[1]).toHaveProperty(
      "disabled",
      false,
    );
    // first button must be selected
    expect(screen.getByRole("button", { name: "1" })).toHaveClass(
      classSelected,
    );
    // next five buttons must be unSelected
    for (let i = 2; i <= 5; i++) {
      expect(screen.getByRole("button", { name: `${i}` })).toHaveClass(
        classUnSelected,
      );
    }
    // margin end button
    expect(screen.getByRole("button", { name: "..." })).toHaveProperty(
      "disabled",
      true,
    );
  });
  it("calls onPageSelect on page 2", () => {
    userEvent.click(screen.getByRole("button", { name: "2" }));
    expect(handlePageSelected).toHaveBeenCalledTimes(1);
  });
  it("calls onPageSelect on next page", () => {
    userEvent.click(screen.queryAllByRole("button", { name: "" })[1]);
    expect(handlePageSelected).toHaveBeenCalledTimes(1);
  });
});

describe("<Pagination /> (both margins)", () => {
  beforeEach(() => {
    handlePageSelected = jest.fn((page: number) => page);
    render(
      <Pagination
        pageTotal={myPageTotal}
        pageSelected={5}
        margin={myMargin}
        padding={myPadding}
        onPageSelect={handlePageSelected}
      />,
    );
  });
  it(`renders with page 5 selected`, () => {
    // prev button must be enabled
    expect(screen.queryAllByRole("button", { name: "" })[0]).toHaveProperty(
      "disabled",
      false,
    );
    // next button must be enabled
    expect(screen.queryAllByRole("button", { name: "" })[1]).toHaveProperty(
      "disabled",
      false,
    );
    // first button must be selected
    expect(screen.getByRole("button", { name: `5` })).toHaveClass(
      classSelected,
    );
    // margins start and end button
    expect(screen.queryAllByRole("button", { name: "..." })).toHaveLength(2);
  });

  it("calls onPageSelect on previos page", () => {
    userEvent.click(screen.queryAllByRole("button", { name: "" })[0]);
    expect(handlePageSelected).toHaveBeenCalledTimes(1);
  });
});

describe("<Pagination /> (only start margin)", () => {
  beforeEach(() => {
    handlePageSelected = jest.fn((page: number) => page);
    render(
      <Pagination
        pageTotal={myPageTotal}
        pageSelected={9}
        margin={myMargin}
        padding={myPadding}
        onPageSelect={handlePageSelected}
      />,
    );
  });
  it(`renders with page 9 selected`, () => {
    // prev button must be enabled
    expect(screen.queryAllByRole("button", { name: "" })[0]).toHaveProperty(
      "disabled",
      false,
    );
    // next button must be enabled
    expect(screen.queryAllByRole("button", { name: "" })[1]).toHaveProperty(
      "disabled",
      false,
    );
    // first button must be selected
    expect(screen.getByRole("button", { name: `9` })).toHaveClass(
      classSelected,
    );
    // margin start button
    expect(screen.getByRole("button", { name: "..." })).toHaveProperty(
      "disabled",
      true,
    );
  });
});

describe("<Pagination /> (without pageTotal)", () => {
  beforeEach(() => {
    handlePageSelected = jest.fn((page: number) => page);
    render(
      <Pagination
        pageSelected={1}
        hasMorePages={myHasMorePages}
        onPageSelect={handlePageSelected}
      />,
    );
  });
  it(`renders with page 1 selected`, () => {
    // prev button must be disabled
    expect(screen.queryAllByRole("button", { name: "" })[0]).toHaveProperty(
      "disabled",
      true,
    );
    // next button must be enabled
    expect(screen.queryAllByRole("button", { name: "" })[1]).toHaveProperty(
      "disabled",
      false,
    );
    // first button must be selected
    expect(screen.queryByRole("button", { name: `1` })).toBeFalsy();
    // no margin start nor end button
    expect(screen.queryByRole("button", { name: "..." })).toBeFalsy();
  });
});

describe("<Pagination /> (without pageTotal nor hasMorePages)", () => {
  beforeEach(() => {
    handlePageSelected = jest.fn((page: number) => page);
    render(
      <Pagination
        pageSelected={1}
        onPageSelect={handlePageSelected}
        hasMorePages={false}
      />,
    );
  });
  it(`renders`, () => {
    // prev button must be disabled
    expect(screen.queryAllByRole("button", { name: "" })[0]).toHaveProperty(
      "disabled",
      true,
    );
    // next button must be enabled
    expect(screen.queryAllByRole("button", { name: "" })[1]).toHaveProperty(
      "disabled",
      true,
    );
  });
});

describe("<Pagination /> (pageTotal < magin)", () => {
  beforeEach(() => {
    handlePageSelected = jest.fn((page: number) => page);
    render(
      <Pagination
        pageTotal={3}
        pageSelected={myPageSelected}
        margin={myMargin}
        padding={myPadding}
        onPageSelect={handlePageSelected}
      />,
    );
  });
  it(`renders with pageTotal=3`, () => {
    // prev button must be disabled
    expect(screen.queryAllByRole("button", { name: "" })[0]).toHaveProperty(
      "disabled",
      true,
    );
    // next button must be enabled
    expect(screen.queryAllByRole("button", { name: "" })[1]).toHaveProperty(
      "disabled",
      false,
    );
    // first button must be selected
    expect(screen.getByRole("button", { name: "1" })).toHaveClass(
      classSelected,
    );
    // next five buttons must be unSelected
    for (let i = 2; i <= 3; i++) {
      expect(screen.getByRole("button", { name: `${i}` })).toHaveClass(
        classUnSelected,
      );
    }
  });
});
