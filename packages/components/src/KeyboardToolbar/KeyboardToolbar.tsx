import * as React from "react";
import classNames from "classnames";

import Group from "./KeyboardToolbar.Group";
import Button from "./KeyboardToolbar.Button";
import Popover from "./KeyboardToolbar.Popover";

import "./KeyboardToolbar.css";

export { InterfaceKeyboardToolbarGroup } from "./KeyboardToolbar.Group";
export { InterfaceKeyboardToolbarButton } from "./KeyboardToolbar.Button";
export { InterfaceKeyboardToolbarPopover } from "./KeyboardToolbar.Popover";

export interface InterfaceKeyboardToolbar {
  /** React node of type children */
  children: React.ReactNode;
  /** Determines if the component is visible */
  show?: boolean;
}

function KeyboardToolbar({
  children,
  show = false,
}: InterfaceKeyboardToolbar): JSX.Element {
  const className = classNames("nimbus--keyboard-toolbar", {
    "is--visible": show,
  });
  return (
    <div className={className}>
      <div className="nimbus--keyboard-toolbar-wrapper">{children}</div>
    </div>
  );
}

KeyboardToolbar.Group = Group;
KeyboardToolbar.Button = Button;
KeyboardToolbar.Popover = Popover;

export default KeyboardToolbar;
