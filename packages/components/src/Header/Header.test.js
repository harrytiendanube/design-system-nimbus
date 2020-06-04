import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render } from "@testing-library/react";
import Header from ".";

describe("Header", () => {
  let title, subtitle, link, linkTo;
  beforeAll(() => {
    title = "title";
    subtitle = "subtitle";
    link = "linkText";
    linkTo = "linkHref";
  });

  it("Render Header", () => {
    const { getByText } = render(<Header title={title} />);
    const component = getByText(title);
    expect(component).toBeTruthy();
  });
  it("Header implements title, text and link", () => {
    const { getByText } = render(
      <Header title={title} subtitle={subtitle} link={link} linkTo={linkTo} />,
    );
    expect(getByText(title)).toContainHTML("</h1>");
    expect(getByText(subtitle)).toContainHTML("</p>");
    expect(getByText(link)).toContainHTML("</a>");
  });
});
