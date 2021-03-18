import * as React from "react";

import classNames from "classnames";

import Item from "./Menu.Item";
import Section from "./Menu.Section";
import { Portal } from "..";

import "./Menu.css";

import BaseMenu, { InterfaceBaseMenu } from "./BaseMenu";

export { InterfaceMenuItem } from "./Menu.Item";

export interface InterfaceMenu extends InterfaceBaseMenu {
  show?: boolean;
  /** Side from which the menu emerges */
  position?: "left" | "right";
  /** OnClose callback */
  onClose: () => void;
}

function Menu({
  children,
  title,
  href,
  footer,
  onClose,
  show = false,
  position = "right",
}: InterfaceMenu): JSX.Element {
  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((event.target as HTMLElement).id === "nimbus--menu") {
      onClose();
    }
  };

  const wrapperClassName = classNames(
    "nimbus--menu",
    { "is--visible": show },
    `position--${position}`,
  );

  return (
    <Portal show={show}>
      <div
        id="nimbus--menu"
        className={wrapperClassName}
        role="presentation"
        onClick={handleClickOutside}
      >
        <div className="nimbus--menu-wrapper">
          <BaseMenu title={title} href={href} footer={footer}>
            {children}
          </BaseMenu>
        </div>
      </div>
    </Portal>
  );
}

Menu.Section = Section;
Menu.Item = Item;

export default Menu;
