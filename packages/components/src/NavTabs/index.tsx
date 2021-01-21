import * as React from "react";

import Item from "./NavTabs.Item";

import "./NavTabs.css";

export { InterfaceNavTabsItem } from "./NavTabs.Item";

export interface InterfaceNavTabs {
  /** React node of type children */
  children: React.ReactNode;
}

function NavTabs({ children }: InterfaceNavTabs): JSX.Element {
  return <div className="nimbus--nav-tabs">{children}</div>;
}

NavTabs.Item = Item;

export default NavTabs;
