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
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag">[];
  /** Renders as skeleton */
  skeleton?: boolean;
  /** OnChange callback */
  onChange: (event: InterfaceNameChecked) => void;
}

function Item({
  title,
  name,
  description,
  labels,
  skeleton,
  onChange,
}: InterfaceInteractiveListActionItem): JSX.Element {
  const mainClass = classNames("nimbus--interactive-list-item");

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
