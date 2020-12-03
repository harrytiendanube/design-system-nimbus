import * as React from "react";
import classNames from "classnames";
import { Icon as IconType } from "@tiendanube/icons";

export interface InterfaceMenuItem {
  /** React node of type children */
  children: React.ReactText;
  /** Icon Component imported from @tiendanube/icons */
  icon: IconType;
  /** Current option selected */
  active?: boolean;
  /** OnClick menu item Callback */
  onClick: () => void;
}

function Item({
  children,
  icon: Icon,
  active = false,
  onClick,
}: InterfaceMenuItem): JSX.Element {
  const mainClass = classNames("nimbus--menu-item", {
    "nimbus--menu-item--active": active,
  });
  return (
    <button type="button" onClick={onClick} className={mainClass}>
      <Icon />
      {children}
    </button>
  );
}

export default Item;
