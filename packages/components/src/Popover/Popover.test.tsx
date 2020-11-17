/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover, Text } from "..";

const PopoverComponent = (props: any) => (
  <Popover
    name="myName"
    label="myLabel"
    title="myTitle"
    position="right"
    {...props}
  >
    <Text>myText</Text>
  </Popover>
);

const emptyProps = { props: {} };

const setup = ({ myText, Component, props }: any) => {
  const { container } = render(
    Component || <PopoverComponent {...props}>{myText}</PopoverComponent>,
  );
  const elementToggler: HTMLElement = container.querySelector(
    "a",
  ) as HTMLElement;

  return { container, elementToggler };
};

describe("<Popover />", () => {
  it("render", () => {
    const { container } = setup(emptyProps);
    expect(screen.getByRole("presentation")).toBeTruthy();
    expect(container.querySelector("a")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
    expect(screen.queryByRole("dialog")).toBeFalsy();
    expect(screen.queryByRole("heading", { name: "myTitle" })).toBeFalsy();
    expect(screen.queryByText("myText")).toBeFalsy();
  });

  it("render children when click toggler and hides when click again", () => {
    const { elementToggler } = setup(emptyProps);
    userEvent.click(elementToggler);
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "myTitle" })).toBeTruthy();
    expect(screen.getByText("myText")).toBeTruthy();
    userEvent.click(elementToggler);
    expect(screen.queryByRole("dialog")).toBeFalsy();
    expect(screen.queryByRole("heading", { name: "myTitle" })).toBeFalsy();
    expect(screen.queryByText("myText")).toBeFalsy();
  });

  it("render children when click toggler and keep showing when click on children", () => {
    const { elementToggler } = setup(emptyProps);
    userEvent.click(elementToggler);
    userEvent.click(screen.getByText("myText"));
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "myTitle" })).toBeTruthy();
    expect(screen.getByText("myText")).toBeTruthy();
  });

  it("render children when click toggler and keep showing when touchStart on children", () => {
    const { elementToggler } = setup(emptyProps);
    userEvent.click(elementToggler);
    fireEvent.touchStart(screen.getByText("myText"));
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "myTitle" })).toBeTruthy();
    expect(screen.getByText("myText")).toBeTruthy();
  });

  it("render children when click toggler and hide when click on main div ", () => {
    const { container, elementToggler } = setup(emptyProps);
    userEvent.click(elementToggler);
    userEvent.click(container.querySelector(".nimbus--popover") as HTMLElement);
    expect(screen.queryByRole("dialog")).toBeFalsy();
  });

  it("render children when click toggler and hide when touchStart on main div", () => {
    const { container, elementToggler } = setup(emptyProps);
    userEvent.click(elementToggler);
    fireEvent.touchStart(
      container.querySelector(".nimbus--popover") as HTMLElement,
    );
    expect(screen.queryByRole("dialog")).toBeFalsy();
  });

  it("render children when click toggler and keep showing when touchStart on icon", () => {
    const { container, elementToggler } = setup(emptyProps);
    userEvent.click(elementToggler);
    fireEvent.touchStart(
      (container.querySelector("svg") as unknown) as HTMLElement,
    );
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "myTitle" })).toBeTruthy();
    expect(screen.getByText("myText")).toBeTruthy();
  });

  it("render children when click toggler and keep showing when touchStart on same toggler", () => {
    const { elementToggler } = setup(emptyProps);
    userEvent.click(elementToggler);
    fireEvent.touchStart(elementToggler);
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "myTitle" })).toBeTruthy();
    expect(screen.getByText("myText")).toBeTruthy();
  });

  it("render children without title when click toggler", () => {
    const { elementToggler } = setup({
      Component: (
        <Popover name="myName" label="myLabel">
          <Text>myText</Text>
        </Popover>
      ),
    });
    userEvent.click(elementToggler);
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "myTitle" })).toBeFalsy();
    expect(screen.getByText("myText")).toBeTruthy();
  });

  it("hide first Popover when second is clicked", () => {
    const { container } = setup({
      Component: (
        <>
          <Popover name="myName" label="myLabel" title="myTitle">
            <Text>myText</Text>
          </Popover>
          <Popover name="myName2" label="myLabel2" title="myTitle2">
            <Text>myText2</Text>
          </Popover>
        </>
      ),
    });
    // at start both popover are closed
    expect(screen.queryByText("myText")).toBeFalsy();
    expect(screen.queryByText("myText2")).toBeFalsy();
    // click on first shows first and keep hide second
    const elementToggler1: HTMLElement = container.querySelectorAll(
      "a",
    )[0] as HTMLElement;
    userEvent.click(elementToggler1);
    expect(screen.getByText("myText")).toBeTruthy();
    expect(screen.queryByText("myText2")).toBeFalsy();
    // click on second shows second and hides first
    const elementToggler2: HTMLElement = container.querySelectorAll(
      "a",
    )[1] as HTMLElement;
    userEvent.click(elementToggler2);
    expect(screen.queryByText("myText")).toBeFalsy();
    expect(screen.getByText("myText2")).toBeTruthy();
  });

  it("render skeleton", () => {
    const { container } = render(<Popover.Skeleton />);
    expect(container.querySelector(".nimbus--popover-skeleton")).toBeTruthy();
  });
});

describe("<Popover menu />", () => {
  const handleClick = jest.fn();
  const popoverMenu = [
    {
      children: "Organize products",
      onClick: handleClick,
    },
    "skeleton",
  ];
  it("render", () => {
    const { container } = setup({ props: { menu: popoverMenu } });
    expect(screen.getByRole("presentation")).toBeTruthy();
    expect(container.querySelector("a")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
    expect(screen.queryByRole("dialog")).toBeFalsy();
    expect(screen.queryByRole("heading", { name: "myTitle" })).toBeFalsy();
  });

  it("render children when click toggler, calls callback option when clicked, and then hide", () => {
    const { elementToggler, container } = setup({
      props: { menu: popoverMenu },
    });
    userEvent.click(elementToggler);
    expect(screen.getByRole("dialog")).toHaveClass(
      "nimbus--popover-wrapper position--right",
    );
    const elementOptionMenu = container.querySelector(
      "a.nimbus--link--default",
    ) as HTMLElement;
    expect(handleClick).not.toHaveBeenCalled();
    userEvent.click(elementOptionMenu);
    expect(screen.queryByRole("dialog")).toBeFalsy();
    expect(handleClick).toHaveBeenCalled();
  });
});
