import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover, Text } from "..";

const myName = "myName";
const myLabel = "myLabel";
const myTitle = "myTitle";
const myText = "myText";
const myIsMenu = false;
const myPosition = "right";

describe("<Popover />", () => {
  it("render", () => {
    const { container } = render(
      <Popover
        name={myName}
        label={myLabel}
        title={myTitle}
        isMenu={myIsMenu}
        position={myPosition}
      >
        <Text>{myText}</Text>
      </Popover>,
    );
    expect(screen.getByRole("presentation")).toBeTruthy();
    expect(screen.getByRole("button", { name: myLabel })).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
    expect(screen.queryByRole("dialog")).toBeFalsy();
    expect(screen.queryByRole("heading", { name: myTitle })).toBeFalsy();
    expect(screen.queryByText(myText)).toBeFalsy();
  });

  it("render children when click button and hides when click again", () => {
    render(
      <Popover name={myName} label={myLabel} title={myTitle} position="right">
        <Text>{myText}</Text>
      </Popover>,
    );
    const element: HTMLElement = screen.getByRole("button", { name: myLabel });
    userEvent.click(element);
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.getByText(myText)).toBeTruthy();
    userEvent.click(element);
    expect(screen.queryByRole("dialog")).toBeFalsy();
    expect(screen.queryByRole("heading", { name: myTitle })).toBeFalsy();
    expect(screen.queryByText(myText)).toBeFalsy();
  });

  it("render children when click button and keep showing when click on children", () => {
    render(
      <Popover name={myName} label={myLabel} title={myTitle}>
        <Text>{myText}</Text>
      </Popover>,
    );
    const element: HTMLElement = screen.getByRole("button", { name: myLabel });
    userEvent.click(element);
    userEvent.click(screen.getByText(myText));
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.getByText(myText)).toBeTruthy();
  });

  it("render children without title when click button", () => {
    render(
      <Popover name={myName} label={myLabel}>
        <Text>{myText}</Text>
      </Popover>,
    );
    const element: HTMLElement = screen.getByRole("button", { name: myLabel });
    userEvent.click(element);
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.queryByRole("heading", { name: myTitle })).toBeFalsy();
    expect(screen.getByText(myText)).toBeTruthy();
  });

  it("hide first Popover when second is clicked", () => {
    const myName2 = "myName2";
    const myLabel2 = "myLabel2";
    const myTitle2 = "myTitle2";
    const myText2 = "myText2";
    render(
      <>
        <Popover name={myName} label={myLabel} title={myTitle}>
          <Text>{myText}</Text>
        </Popover>
        <Popover name={myName2} label={myLabel2} title={myTitle2}>
          <Text>{myText2}</Text>
        </Popover>
      </>,
    );
    // at start both popover are closed
    expect(screen.queryByText(myText)).toBeFalsy();
    expect(screen.queryByText(myText2)).toBeFalsy();
    // click on first shows first and keep hide second
    const element1: HTMLElement = screen.getByRole("button", { name: myLabel });
    userEvent.click(element1);
    expect(screen.getByText(myText)).toBeTruthy();
    expect(screen.queryByText(myText2)).toBeFalsy();
    // click on second shows second and hides first
    const element2: HTMLElement = screen.getByRole("button", {
      name: myLabel2,
    });
    userEvent.click(element2);
    expect(screen.queryByText(myText)).toBeFalsy();
    expect(screen.getByText(myText2)).toBeTruthy();
  });

  it("render as a menu and position right", () => {
    render(
      <Popover name={myName} title={myTitle} position="right" isMenu>
        <Text>{myText}</Text>
      </Popover>,
    );
    const element: HTMLElement = screen.getByRole("button");
    userEvent.click(element);
    expect(screen.getByRole("dialog")).toHaveClass(
      "nimbus--popover-wrapper position--right",
    );
  });

  it("render skeleton", () => {
    const { container } = render(<Popover.Skeleton />);
    expect(container.querySelector(".nimbus--popover-skeleton")).toBeTruthy();
  });
});
