import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Header from ".";

describe("Header", () => {
  const titleText = "titleText";
  const subtitleText = "Subtitle Text";
  const linkText = "linkText";
  const linkHref = "linkHref";
  it("Render Header", () => {
    const { getByText } = render(<Header titleText={titleText} />);
    const component = getByText(titleText);
    expect(component).toBeTruthy();
  });
  it("Header implements title, text and link", () => {
    const { getByText } = render(
      <Header
        titleText={titleText}
        subtitleText={subtitleText}
        linkText={linkText}
        linkHref={linkHref}
      />,
    );
    expect(getByText(titleText)).toContainHTML("</h1>");
    expect(getByText(subtitleText)).toContainHTML("</p>");
    expect(getByText(linkText)).toContainHTML("</a>");
  });
});
