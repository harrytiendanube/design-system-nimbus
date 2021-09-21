import * as React from "react";
import classNames from "classnames";
import { ChevronRightIcon } from "@tiendanube/icons";
import { Text, InterfaceLabel } from "..";
import { renderBelow } from "./utils";
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
}

function Item({
  title,
  name,
  description,
  labels,
  skeleton,
  hideBorder,
  onChange,
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
        <div className="nimbus--interactive-list-item__title">
          {skeleton ? <Text.Skeleton /> : <Text>{title}</Text>}
          {!skeleton && <ChevronRightIcon />}
        </div>
        {renderBelow(description, labels, skeleton)}
      </button>
    </div>
  );
}

export default Item;
