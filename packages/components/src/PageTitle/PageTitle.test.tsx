import * as React from "react";
import { render, screen } from "@testing-library/react";

import { PageTitle } from "..";

const myTitle = "myTitle";
const mySubtitle = "mySubtitle";
const myLink = "myLink";
const myLinkTo = "https://www.myLinkTo.com/";

describe("<PageTile />", () => {
  it("render", () => {
    render(
      <PageTitle
        title={myTitle}
        subtitle={mySubtitle}
        link={myLink}
        linkTo={myLinkTo}
      />,
    );
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.getByText(mySubtitle)).toBeTruthy();
    expect(screen.getByRole("link", { name: myLink })).toHaveAttribute(
      "href",
      myLinkTo,
    );
  });
  it("render without subtitle", () => {
    render(<PageTitle title={myTitle} link={myLink} linkTo={myLinkTo} />);
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.queryByText(mySubtitle)).toBeFalsy();
    expect(screen.getByRole("link", { name: myLink })).toHaveAttribute(
      "href",
      myLinkTo,
    );
  });
  it("render without link", () => {
    render(<PageTitle title={myTitle} subtitle={mySubtitle} />);
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.getByText(mySubtitle)).toBeTruthy();
    expect(screen.queryByRole("link", { name: myLink })).toBeFalsy();
  });
});
