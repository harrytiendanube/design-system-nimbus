import * as React from "react";

import Item from "./List.Item";

import "./List.css";

export { InterfaceListItem } from "./List.Item";

export interface InterfaceList {
  /** React node of type children */
  children: React.ReactNode;
}

function List({ children }: InterfaceList): JSX.Element {
  return (
    <div className="nimbus--list-wrapper">
      <ul className="nimbus--list nimbus--list--unordered">{children}</ul>
    </div>
  );
}

List.Item = Item;

export default List;
