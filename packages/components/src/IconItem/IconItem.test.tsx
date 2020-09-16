import * as React from "react";
import { render, screen } from "@testing-library/react";

import { ArchiveIcon } from "@tiendanube/icons";
import IconItem from ".";

const myAppearance = "default";
const myLink = "myLink";
const myLinkTo = "https://www.myLinkTo.com/";
const myTitle = "myTitle";
const mySubtitle = "mySubtitle";

describe("<IconItem />", () => {
  it("render", () => {
    const { container } = render(
      <IconItem
        appearance={myAppearance}
        icon={ArchiveIcon}
        title={myTitle}
        subtitle={mySubtitle}
        link={myLink}
        linkTo={myLinkTo}
      />,
    );
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.getByText(mySubtitle)).toBeTruthy();
    expect(screen.getByRole("link", { name: myLink })).toHaveAttribute(
      "href",
      myLinkTo,
    );
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });
  it("render without subtitle", () => {
    const { container } = render(
      <IconItem
        appearance={myAppearance}
        icon={ArchiveIcon}
        title={myTitle}
        link={myLink}
        linkTo={myLinkTo}
      />,
    );
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.queryByText(mySubtitle)).toBeFalsy();
    expect(screen.getByRole("link", { name: myLink })).toHaveAttribute(
      "href",
      myLinkTo,
    );
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });
  it("render without link", () => {
    const { container } = render(
      <IconItem
        appearance={myAppearance}
        icon={ArchiveIcon}
        title={myTitle}
        subtitle={mySubtitle}
      />,
    );
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.getByText(mySubtitle)).toBeTruthy();
    expect(screen.queryByRole("link", { name: myLink })).toBeFalsy();
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });
});
