import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ImageItem from ".";

const handleClick = jest.fn();
const myThumbnail = "https://www.myThumbnail.com/";
const myLink = { children: "myLink", onClick: handleClick };
const mySubtitle = { children: "mySubtitle" };
const myDescription = { children: "myDescription" };
const classLink = "nimbus--link--primary";

describe("<ImageItem />", () => {
  it("render", () => {
    const { container } = render(
      <ImageItem
        thumbnail={myThumbnail}
        link={myLink}
        subtitle={mySubtitle}
        description={myDescription}
      />,
    );
    expect(screen.getByRole("listitem")).toBeTruthy();
    expect(screen.getByAltText(myLink.children)).toHaveAttribute(
      "src",
      myThumbnail,
    );
    expect(screen.getByText(mySubtitle.children)).toBeTruthy();
    expect(screen.getByText(myDescription.children)).toBeTruthy();
    expect(container.querySelector("a")).toHaveClass(classLink);
  });
  it("render without thumbnail", () => {
    const { container } = render(
      <ImageItem
        link={myLink}
        subtitle={mySubtitle}
        description={myDescription}
      />,
    );
    expect(screen.getByRole("listitem")).toBeTruthy();
    expect(screen.queryByAltText(myLink.children)).toBeFalsy();
    expect(screen.getByText(mySubtitle.children)).toBeTruthy();
    expect(screen.getByText(myDescription.children)).toBeTruthy();
    expect(container.querySelector("a")).toHaveClass(classLink);
  });
  it("render without subtitle", () => {
    const { container } = render(
      <ImageItem
        thumbnail={myThumbnail}
        link={myLink}
        description={myDescription}
      />,
    );
    expect(screen.getByRole("listitem")).toBeTruthy();
    expect(screen.getByAltText(myLink.children)).toHaveAttribute(
      "src",
      myThumbnail,
    );
    expect(screen.queryByText(mySubtitle.children)).toBeFalsy();
    expect(screen.getByText(myDescription.children)).toBeTruthy();
    expect(container.querySelector("a")).toHaveClass(classLink);
  });
  it("render without description", () => {
    const { container } = render(
      <ImageItem thumbnail={myThumbnail} link={myLink} subtitle={mySubtitle} />,
    );
    expect(screen.getByRole("listitem")).toBeTruthy();
    expect(screen.getByAltText(myLink.children)).toHaveAttribute(
      "src",
      myThumbnail,
    );
    expect(screen.getByText(mySubtitle.children)).toBeTruthy();
    expect(screen.queryByText(myDescription.children)).toBeFalsy();
    expect(container.querySelector("a")).toHaveClass(classLink);
  });

  it("render skeleton", () => {
    const { container } = render(<ImageItem.Skeleton />);
    expect(
      container.querySelector(".nimbus--image-item-skeleton"),
    ).toBeTruthy();
    expect(
      container.querySelector(".nimbus--image-item-skeleton__thumbnail"),
    ).toBeTruthy();
    expect(
      container.querySelector(".nimbus--image-item-skeleton__info"),
    ).toBeTruthy();
    expect(
      container.querySelector(".nimbus--image-item-skeleton__info-item"),
    ).toBeTruthy();
  });

  it("calls onChange", () => {
    const { container } = render(
      <ImageItem
        thumbnail={myThumbnail}
        link={myLink}
        subtitle={mySubtitle}
        description={myDescription}
      />,
    );
    const element = container.querySelector("a");
    userEvent.click(element as HTMLElement);
    expect(handleClick).toBeCalled();
  });
});
