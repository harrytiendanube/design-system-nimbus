import * as React from "react";
import { render, screen } from "@testing-library/react";

import ImageItem from ".";

const myThumbnail = "https://www.myThumbnail.com/";
const myLink = "myLink";
const myLinkTo = "https://www.myLinkTo.com/";
const mySubtitle = "mySubtitle";
const myDescription = "myDescription";

describe("<ImageItem />", () => {
  it("render", () => {
    render(
      <ImageItem
        thumbnail={myThumbnail}
        link={myLink}
        linkTo={myLinkTo}
        subtitle={mySubtitle}
        description={myDescription}
      />,
    );
    expect(screen.getByRole("listitem")).toBeTruthy();
    expect(screen.getByAltText(myLink)).toHaveAttribute("src", myThumbnail);
    expect(screen.getByText(mySubtitle)).toBeTruthy();
    expect(screen.getByText(myDescription)).toBeTruthy();
    expect(screen.getByRole("link", { name: myLink })).toHaveAttribute(
      "href",
      myLinkTo,
    );
  });
  it("render without thumbnail", () => {
    render(
      <ImageItem
        link={myLink}
        linkTo={myLinkTo}
        subtitle={mySubtitle}
        description={myDescription}
      />,
    );
    expect(screen.getByRole("listitem")).toBeTruthy();
    expect(screen.queryByAltText(myLink)).toBeFalsy();
    expect(screen.getByText(mySubtitle)).toBeTruthy();
    expect(screen.getByText(myDescription)).toBeTruthy();
    expect(screen.getByRole("link", { name: myLink })).toHaveAttribute(
      "href",
      myLinkTo,
    );
  });
  it("render without subtitle", () => {
    render(
      <ImageItem
        thumbnail={myThumbnail}
        link={myLink}
        linkTo={myLinkTo}
        description={myDescription}
      />,
    );
    expect(screen.getByRole("listitem")).toBeTruthy();
    expect(screen.getByAltText(myLink)).toHaveAttribute("src", myThumbnail);
    expect(screen.queryByText(mySubtitle)).toBeFalsy();
    expect(screen.getByText(myDescription)).toBeTruthy();
    expect(screen.getByRole("link", { name: myLink })).toHaveAttribute(
      "href",
      myLinkTo,
    );
  });
  it("render without description", () => {
    render(
      <ImageItem
        thumbnail={myThumbnail}
        link={myLink}
        linkTo={myLinkTo}
        subtitle={mySubtitle}
      />,
    );
    expect(screen.getByRole("listitem")).toBeTruthy();
    expect(screen.getByAltText(myLink)).toHaveAttribute("src", myThumbnail);
    expect(screen.getByText(mySubtitle)).toBeTruthy();
    expect(screen.queryByText(myDescription)).toBeFalsy();
    expect(screen.getByRole("link", { name: myLink })).toHaveAttribute(
      "href",
      myLinkTo,
    );
  });
});
