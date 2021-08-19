import * as React from "react";
import { render, screen } from "@testing-library/react";
import { ExternalLinkIcon } from "@tiendanube/icons";

import { PageTitle } from "..";

const myTitle = "myTitle";
const mySubtitle = "mySubtitle";
const myLink = {
  children: "myLink",
  href: "https://www.myLink.com",
  appearance: "primary" as "primary" | "secondary" | "default" | "danger",
  underline: true,
  icon: ExternalLinkIcon,
};

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

  it("render with link that has primary appearance, underline and icon", () => {
    const { container } = render(
      <PageTitle title={myTitle} subtitle={mySubtitle} link={myLink} />,
    );
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.queryByText(mySubtitle)).toBeTruthy();
    expect(screen.getByRole("link", { name: myLink.children })).toHaveClass(
      "nimbus--link--primary",
      "nimbus--link--underlined",
    );
    expect(container.querySelector("i")).toHaveClass(
      "nimbus--link__icon",
      "nimbus--link__icon--start",
    );
  });
});
