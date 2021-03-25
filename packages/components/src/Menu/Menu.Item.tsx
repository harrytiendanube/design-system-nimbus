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
  /** Subsections inside Menu item */
  subItem?: InterfaceMenuSubItem[];
}

export interface InterfaceMenuSubItem {
  /** Sub-item name */
  children: React.ReactText;
  /** Sub-item onClick callback */
  onClick: () => void;
  /** Current option selected */
  active?: boolean;
}

function Item({
  children,
  icon: Icon,
  active = false,
  onClick,
  subItem,
}: InterfaceMenuItem): JSX.Element {
  const wrapperClass = classNames("nimbus--menu-item-wrapper", {
    "nimbus--menu-item--active": active,
  });
  return (
    <div className={wrapperClass}>
      <button type="button" onClick={onClick} className="nimbus--menu-item">
        <Icon />
        {children}
      </button>
      {subItem && (
        <div className="nimbus--menu-sub-item-wrapper">
          {subItem?.map((item, index) => {
            const subItemClass = classNames("nimbus--menu-sub-item", {
              "nimbus--menu-sub-item--active": item.active,
            });
            return (
              <button
                key={index}
                type="button"
                onClick={item.onClick}
                className={subItemClass}
              >
                {item.children}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Item;
