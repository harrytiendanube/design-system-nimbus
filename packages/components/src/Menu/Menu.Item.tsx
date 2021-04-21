import * as React from "react";
import classNames from "classnames";
import { Icon as IconType } from "@tiendanube/icons";
import Label, { InterfaceLabel } from "../Label";

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
  /** Menu Item label */
  label?: Pick<InterfaceLabel, "id" | "appearance" | "icon" | "label">;
}

export interface InterfaceMenuSubItem {
  /** Sub-item name */
  children: React.ReactText;
  /** Sub-item onClick callback */
  onClick: () => void;
  /** Current option selected */
  active?: boolean;
  /** Menu Item label */
  label?: Pick<InterfaceLabel, "id" | "appearance" | "icon" | "label">;
}

function Item({
  children,
  icon: Icon,
  active = false,
  onClick,
  subItem,
  label,
}: InterfaceMenuItem): JSX.Element {
  const wrapperClass = classNames("nimbus--menu-item-wrapper", {
    "nimbus--menu-item--active": active,
  });
  const renderLabel = label && (
    <Label
      id={label.id}
      appearance={label.appearance}
      icon={label.icon}
      label={label.label}
    />
  );
  return (
    <div className={wrapperClass}>
      <button type="button" onClick={onClick} className="nimbus--menu-item">
        <Icon />
        <span className="nimbus--menu-item__label">{children}</span>
        {renderLabel}
      </button>
      {subItem && (
        <div className="nimbus--menu-sub-item-wrapper">
          {subItem?.map((item, index) => {
            const subItemClass = classNames("nimbus--menu-sub-item", {
              "nimbus--menu-sub-item--active": item.active,
            });
            const renderSubItemLabel = item.label && (
              <Label
                id={item.label.id}
                appearance={item.label.appearance}
                icon={item.label.icon}
                label={item.label.label}
              />
            );
            return (
              <button
                key={index}
                type="button"
                onClick={item.onClick}
                className={subItemClass}
              >
                <span className="nimbus--menu-item__label">
                  {item.children}
                </span>
                {renderSubItemLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Item;
