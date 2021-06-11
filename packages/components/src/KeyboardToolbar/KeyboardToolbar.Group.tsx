import * as React from "react";

export interface InterfaceKeyboardToolbarGroup {
  /** React node of type children */
  children: React.ReactNode;
}

function Group({ children }: InterfaceKeyboardToolbarGroup): JSX.Element {
  return <div className="nimbus--keyboard-toolbar-group">{children}</div>;
}

export default Group;
