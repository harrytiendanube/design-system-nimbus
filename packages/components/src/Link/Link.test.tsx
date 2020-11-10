import React from "react";

import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExternalLinkIcon } from "@tiendanube/icons";
import { Link } from "..";

const myHref = "http://myHref.com";
const myTarget = "_blank";
const myAppearance = "default";
const myUnderline = false;
const myIconPosition = "start";
const myIconSize = "small";
const myText = "myText";

describe("<Link />", () => {
  it("renders", () => {
    const { container } = render(
      <Link
        href={myHref}
        icon={ExternalLinkIcon}
        iconPosition={myIconPosition}
        iconSize={myIconSize}
        target={myTarget}
        appearance={myAppearance}
        underline={myUnderline}
      >
        {myText}
      </Link>,
    );
    const component = screen.getByRole("link", { name: myText });
    expect(component).toBeTruthy();
    expect(component).toHaveAttribute("href", myHref);
    expect(component).toHaveAttribute("target", myTarget);
    expect(component).toHaveClass(`nimbus--link--${myAppearance}`);
    expect(container.querySelector("i")).toHaveClass(
      `nimbus--link__icon--${myIconPosition}`,
    );
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("renders without optional parameters", () => {
    const { container } = render(<Link href={myHref}>{myText}</Link>);
    const component = screen.getByRole("link", { name: myText });
    expect(component).toBeTruthy();
    expect(component).toHaveAttribute("href", myHref);
    expect(component).toHaveAttribute("target", myTarget);
    expect(component).toHaveClass(`nimbus--link--${myAppearance}`);
    expect(container.querySelector("i")).toBeFalsy();
    expect(container.querySelector("svg")).toBeFalsy();
  });

  it("renders with underline", () => {
    render(
      <Link href={myHref} underline>
        {myText}
      </Link>,
    );
    const component = screen.getByRole("link", { name: myText });
    expect(component).toHaveClass(
      `nimbus--link--${myAppearance} nimbus--link--underlined`,
    );
  });

  it("renders with end position Icon", () => {
    const { container } = render(
      <Link href={myHref} icon={ExternalLinkIcon} iconPosition="end">
        {myText}
      </Link>,
    );
    expect(container.querySelector("i")).toHaveClass(`nimbus--link__icon--end`);
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("renders skeleton", () => {
    const { container } = render(<Link.Skeleton />);
    expect(container.querySelector(".nimbus--link-skeleton")).toBeTruthy();
  });

  it("calls onClick", () => {
    const handleClick = jest.fn();
    render(
      <Link href={myHref} onClick={handleClick}>
        {myText}
      </Link>,
    );
    const element: HTMLElement = screen.getByRole("link", {
      name: myText,
    });
    userEvent.click(element);
    expect(handleClick).toHaveBeenCalled();
  });
});
