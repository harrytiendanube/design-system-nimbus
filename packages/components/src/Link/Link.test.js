import React from "react";
import { render } from "@testing-library/react";
import Link from "./";
import "@testing-library/jest-dom/extend-expect";

describe("Link", () => {
  it("Render Link", () => {
    const { getByTestId } = render(
      <Link data-testid="link" start="Facebook" end="LongArrowRight">
        This is my Link
      </Link>,
    );
    const link = getByTestId("link");
    expect(link).toHaveTextContent("This is my Link");
  });
});
