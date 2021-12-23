import * as React from "react";
import classNames from "classnames";
import { ChevronRightIcon, Icon as IconType } from "@tiendanube/icons";
import { Text, InterfaceLabel } from "..";
import { renderBelow, renderIcon, renderBlockLeft } from "./utils";
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
  /** Renders a content block to the left of the component */
  blockLeft?: React.ReactNode;
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
  blockLeft,
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
        onClick={handleChange}
        className="nimbus--interactive-list-item__button"
      >
        {renderBlockLeft(blockLeft)}
        <div className="nimbus--interactive-list-item__content">
          <div className="nimbus--interactive-list-item__title">
            {renderIcon(icon, iconAppearance)}
            {skeleton ? <Text.Skeleton /> : <Text>{title}</Text>}
            {!skeleton && <ChevronRightIcon />}
          </div>
          {renderBelow(description, labels, skeleton)}
        </div>
      </button>
    </div>
  );
}

export default Item;
