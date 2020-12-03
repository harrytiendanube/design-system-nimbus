/* eslint-disable spellcheck/spell-checker */
import * as React from "react";
import { render, screen } from "@testing-library/react";
import {
  HomeIcon,
  CashIcon,
  TagIcon,
  MobileIcon,
  LogOutIcon,
} from "@tiendanube/icons";
import Menu from ".";

describe("<Stack />", () => {
  it("render", () => {
    render(
      <Menu
        title="title"
        href="http://www.tiendanube.com"
        footer={{
          label: "Close Session",
          icon: LogOutIcon,
          onClick: jest.fn(),
        }}
      >
        <Menu.Section>
          <Menu.Item icon={HomeIcon} onClick={jest.fn()} active>
            Start
          </Menu.Item>
        </Menu.Section>
        <Menu.Section title="Manage">
          <Menu.Item icon={CashIcon} onClick={jest.fn()}>
            Sales
          </Menu.Item>
          <Menu.Item icon={TagIcon} onClick={jest.fn()}>
            Products
          </Menu.Item>
        </Menu.Section>
        <Menu.Section title="Enhance">
          <Menu.Item icon={MobileIcon} onClick={jest.fn()}>
            Keyboard
          </Menu.Item>
        </Menu.Section>
      </Menu>,
    );
    expect(screen.getByRole("heading", { name: "title" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "title" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Start" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Sales" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Products" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Keyboard" })).toBeTruthy();
  });
});
