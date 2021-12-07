import * as React from "react";
import classNames from "classnames";
import { ChevronRightIcon, Icon as IconType } from "@tiendanube/icons";
import { Text, InterfaceLabel } from "..";
import { renderBelow, renderIcon } from "./utils";
import { InterfaceNameChecked } from "../common/interfaces";

export interface InterfaceInteractiveListActionItem {
  /** Title */
  title: string;
  /** Name */
  name: string;
  /** Description */
  description?: string;
  /** Labels */
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag" | "appearance">[];
  /** Renders as skeleton */
  skeleton?: boolean;
  /** Border bottom on options */
  hideBorder?: boolean;
  /** OnChange callback */
  onChange: (event: InterfaceNameChecked) => void;
  /** Icon Component imported from @tiendanube/icons */
  icon?: IconType;
  /** Appearance of the IconItem determines the background color */
  iconAppearance?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success";
}

function Item({
  title,
  name,
  description,
  labels,
  skeleton,
  hideBorder,
  onChange,
  icon,
  iconAppearance,
}: InterfaceInteractiveListActionItem): JSX.Element {
  const mainClass = classNames("nimbus--interactive-list-item", {
    "nimbus--interactive-list-item__borderBottom": hideBorder,
  });

  const handleChange = () => {
    onChange({ name, checked: true });
  };

  return (
    <div role="listitem" className={mainClass}>
      <button
        type="button"
        id={name}
        style={{ display: "block" }}
        onClick={handleChange}
        className="nimbus--interactive-list-item__button"
      >
        <div className="nimbus--interactive-list-item__wrapper--all">
          <div className="nimbus--interactive-list-item__wrapper--upper">
            {renderIcon(icon, iconAppearance)}
            <div className="nimbus--interactive-list-item__title">
              {skeleton ? <Text.Skeleton /> : <Text>{title}</Text>}
              {!skeleton && <ChevronRightIcon />}
            </div>
          </div>
        </div>
        {renderBelow(description, labels, skeleton)}
      </button>
    </div>
  );
}

export default Item;
