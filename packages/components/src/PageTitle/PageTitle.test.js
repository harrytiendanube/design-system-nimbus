import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render } from "@testing-library/react";
import PageTitle from ".";

describe("PageTitle", () => {
  let title, subtitle, link, linkTo;
  beforeAll(() => {
    title = "title";
    subtitle = "subtitle";
    link = "linkText";
    linkTo = "linkHref";
  });

  it("Render PageTitle", () => {
    const { getByText } = render(<PageTitle title={title} />);
    const component = getByText(title);
    expect(component).toBeTruthy();
  });
  it("PageTitle implements title, text and link", () => {
    const { getByText } = render(
      <PageTitle
        title={title}
        subtitle={subtitle}
        link={link}
        linkTo={linkTo}
      />,
    );
    expect(getByText(title)).toContainHTML("</h1>");
    expect(getByText(subtitle)).toContainHTML("</p>");
    expect(getByText(link)).toContainHTML("</a>");
  });
});
