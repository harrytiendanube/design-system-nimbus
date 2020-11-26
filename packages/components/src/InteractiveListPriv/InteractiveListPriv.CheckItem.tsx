import * as React from "react";
import classNames from "classnames";
import { CheckIcon } from "@tiendanube/icons";
import { Text, InterfaceLabel, Checkbox } from "..";
import { renderBelow } from "./utils";
import { InterfaceNameChecked } from "../common/interfaces";

export interface InterfaceInteractiveListCheckItem {
  /** Title */
  title: string;
  /** Name */
  name: string;
  /** Description */
  description?: string;
  /** Labels */
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag">[];
  /** Checked value */
  checked?: boolean;
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
  checked,
  skeleton,
  onChange,
}: InterfaceInteractiveListCheckItem): JSX.Element {
  const mainClass = classNames("nimbus--interactive-list-item");

  const id = `input_${title}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    onChange({ name: target.name, checked: target.checked });
  };

  return (
    <label htmlFor={id} className={mainClass}>
      <div className="nimbus--interactive-list-item__title">
        {skeleton ? <Text.Skeleton /> : <Text>{title}</Text>}
        <div className="nimbus--checkbox-wrapper">
          {skeleton ? (
            <Checkbox.Skeleton />
          ) : (
            <>
              <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={handleChange}
                className="nimbus--checkbox"
              />
              <div className="nimbus--checkbox-label" />
              {checked && (
                <div className="nimbus--checkbox__check">
                  <CheckIcon />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {renderBelow(description, labels, skeleton)}
    </label>
  );
}

export default Item;
