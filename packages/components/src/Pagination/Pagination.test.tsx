import * as React from "react";
import { render, screen } from "@testing-library/react";

import Pagination from ".";

describe("Render Pagination", () => {
  it("shows simple Pagination", () => {
    render(
      <Pagination pageTotal={12} pageSelected={1} onPageSelect={() => null} />,
    );
    const element: HTMLElement = screen.getByRole("navigation");
    expect(element).toBeTruthy();
  });
});
