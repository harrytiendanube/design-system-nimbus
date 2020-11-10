import * as React from "react";
import { render, screen } from "@testing-library/react";

import { PageTitle } from "..";

const myTitle = "myTitle";
const mySubtitle = "mySubtitle";
const myLink = { children: "myLink", href: "https://www.myLink.com" };

describe("<PageTile />", () => {
  it("render", () => {
    render(<PageTitle title={myTitle} subtitle={mySubtitle} link={myLink} />);
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.getByText(mySubtitle)).toBeTruthy();
    expect(screen.getByRole("link", { name: myLink.children })).toHaveAttribute(
      "href",
      myLink.href,
    );
  });
  it("render without subtitle", () => {
    render(<PageTitle title={myTitle} link={myLink} />);
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.queryByText(mySubtitle)).toBeFalsy();
    expect(screen.getByRole("link", { name: myLink.children })).toHaveAttribute(
      "href",
      myLink.href,
    );
  });
  it("render without link", () => {
    render(<PageTitle title={myTitle} subtitle={mySubtitle} />);
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.getByText(mySubtitle)).toBeTruthy();
    expect(screen.queryByRole("link", { name: myLink.children })).toBeFalsy();
  });
});
