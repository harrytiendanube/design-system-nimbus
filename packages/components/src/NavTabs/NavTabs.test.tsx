/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { render, screen } from "@testing-library/react";

import { HomeIcon, MoneyIcon, TagIcon } from "@tiendanube/icons";

import { NavTabs } from "..";

const NavTabsComponent = (props: any) => (
  <NavTabs {...props}>
    <NavTabs.Item
      label="Dashboard"
      icon={HomeIcon}
      onClick={jest.fn()}
      active
    />
    <NavTabs.Item label="Orders" icon={MoneyIcon} onClick={jest.fn()} />
    <NavTabs.Item label="Products" icon={TagIcon} onClick={jest.fn()} />
  </NavTabs>
);

const setup = ({ Component, props }: any) => {
  const { container } = render(Component || <NavTabsComponent {...props} />);
  return { container };
};

describe("<NavTabs />", () => {
  it("render on mobile", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 671,
    });
    setup({ props: {} });
    expect(screen.getByRole("button", { name: "Dashboard" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Orders" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Products" })).toBeTruthy();
  });
});
