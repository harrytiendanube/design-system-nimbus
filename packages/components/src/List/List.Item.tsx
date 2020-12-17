import * as React from "react";

export interface InterfaceListItem {
  /** React node of type children */
  children: React.ReactNode;
}

function Item({ children }: InterfaceListItem): JSX.Element {
  return <li className="nimbus--list-item">{children}</li>;
}

export default Item;
