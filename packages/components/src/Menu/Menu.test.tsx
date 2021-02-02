/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  HomeIcon,
  CashIcon,
  TagIcon,
  MobileIcon,
  LogOutIcon,
} from "@tiendanube/icons";
import Menu from ".";

const MenuComponent = (props: any) => {
  const { handleClickOption, handleClose, handleClickFooter } = props;
  return (
    <Menu
      title="title"
      onClose={handleClose}
      href="http://www.tiendanube.com"
      footer={{
        label: "Close Session",
        icon: LogOutIcon,
        onClick: handleClickFooter,
      }}
      {...props}
    >
      <Menu.Section>
        <Menu.Item icon={HomeIcon} onClick={handleClickOption} active>
          Start
        </Menu.Item>
      </Menu.Section>
      <Menu.Section title="Manage">
        <Menu.Item icon={CashIcon} onClick={handleClickOption}>
          Sales
        </Menu.Item>
        <Menu.Item icon={TagIcon} onClick={handleClickOption}>
          Products
        </Menu.Item>
      </Menu.Section>
      <Menu.Section title="Enhance">
        <Menu.Item icon={MobileIcon} onClick={handleClickOption}>
          Keyboard
        </Menu.Item>
      </Menu.Section>
    </Menu>
  );
};

const setup = ({ Component, props }: any | null = {}) => {
  const handleClose = jest.fn();
  const handleClickOption = jest.fn();
  const handleClickFooter = jest.fn();

  const { container } = render(
    Component || (
      <MenuComponent
        handleClose={handleClose}
        handleClickOption={handleClickOption}
        handleClickFooter={handleClickFooter}
        {...props}
      />
    ),
  );

  const presentation = screen.getByRole("presentation");
  const buttonStart = screen.getByRole("button", { name: "Start" });
  const buttonSales = screen.getByRole("button", { name: "Sales" });
  const buttonProducts = screen.getByRole("button", { name: "Products" });
  const buttonKeyboard = screen.getByRole("button", { name: "Keyboard" });
  const buttonClose = screen.getByRole("button", { name: "Close Session" });

  return {
    container,
    presentation,
    buttonStart,
    buttonSales,
    buttonProducts,
    buttonKeyboard,
    buttonClose,
    handleClose,
    handleClickOption,
  };
};

describe("<Menu />", () => {
  it("render", () => {
    const {
      presentation,
      buttonStart,
      buttonSales,
      buttonProducts,
      buttonClose,
      buttonKeyboard,
    } = setup();
    expect(screen.getByRole("heading", { name: "title" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "title" })).toBeTruthy();
    expect(presentation).not.toHaveClass("is--visible");
    expect(buttonStart).toBeTruthy();
    expect(buttonSales).toBeTruthy();
    expect(buttonProducts).toBeTruthy();
    expect(buttonClose).toBeTruthy();
    expect(buttonKeyboard).toBeTruthy();
  });

  it("render with showed and position", () => {
    const { presentation } = setup({ props: { show: true, position: "left" } });
    expect(presentation).toHaveClass("is--visible");
    expect(presentation).toHaveClass("position--left");
  });

  it("calls onClick on menu options", () => {
    const {
      buttonStart,
      buttonSales,
      buttonProducts,
      buttonKeyboard,
      handleClickOption,
    } = setup();
    userEvent.click(buttonStart);
    userEvent.click(buttonSales);
    userEvent.click(buttonProducts);
    userEvent.click(buttonKeyboard);
    expect(handleClickOption).toHaveBeenCalledTimes(4);
  });

  it("calls onClose when clicks outside menu", () => {
    const { presentation, handleClose } = setup();
    userEvent.click(presentation);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
