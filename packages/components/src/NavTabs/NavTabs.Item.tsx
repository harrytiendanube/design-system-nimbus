import * as React from "react";

import classNames from "classnames";
import { Icon as IconType } from "@tiendanube/icons";

import "./NavTabs.css";

export interface InterfaceNavTabsItem {
  /** Button label used for accessibility */
  label: string;
  /** Icon for the tab button */
  icon: IconType;
  /** Indicates whether this tab is active or not */
  active?: boolean;
  /** If true the tab will be featured with a badge icon */
  badge?: boolean;
  /** OnClick nav tab item Callback */
  onClick: () => void;
}

function Item({
  label,
  icon: Icon,
  active = false,
  badge = false,
  onClick,
}: InterfaceNavTabsItem): JSX.Element {
  const mainClass = classNames("nimbus--nav-tabs-item", {
    "nimbus--nav-tabs-item--active": active,
    "nimbus--nav-tabs-item--badge": badge,
  });
  return (
    <button title={label} type="button" onClick={onClick} className={mainClass}>
      <Icon size="medium" />
    </button>
  );
}

export default Item;
