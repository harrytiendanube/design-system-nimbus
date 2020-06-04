import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render } from "@testing-library/react";
import Link from "./";

describe("Link", () => {
  it("Render Link", () => {
    const myText = "myText";
    const { getByText } = render(
      <Link start="Facebook" end="LongArrowRight">
        {myText}
      </Link>,
    );
    const component = getByText(myText);
    expect(component).toBeTruthy();
    expect(component).toContainHTML("</a>");
  });
});
