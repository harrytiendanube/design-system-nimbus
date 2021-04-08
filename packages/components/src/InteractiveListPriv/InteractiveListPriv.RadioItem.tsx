import * as React from "react";
import classNames from "classnames";
import { CheckIcon } from "@tiendanube/icons";
import { Text, Checkbox, InterfaceLabel, InterfaceNameChecked } from "..";
import { renderBelow } from "./utils";

export interface InterfaceInteractiveListRadioItem {
  /** Title */
  title: string;
  /** Description */
  description?: string;
  /** Labels */
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag">[];
  /** Value */
  value: string;
  /** Checked value */
  checked?: boolean;
  /** Renders as skeleton */
  skeleton?: boolean;
  /** OnChange callback */
  onChange: (event: InterfaceNameChecked) => void;
}

function Item({
  title,
  description,
  labels,
  value,
  checked,
  skeleton,
  onChange,
}: InterfaceInteractiveListRadioItem): JSX.Element {
  const mainClass = classNames("nimbus--interactive-list-item");

  const id = `input_${title}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    onChange({ name: target.value, checked: target.checked });
  };

  return (
    <label htmlFor={id} className={mainClass} role="listitem">
      <div className="nimbus--interactive-list-item__title">
        {skeleton ? <Text.Skeleton /> : <Text>{title}</Text>}
        <div className="nimbus--radio-wrapper">
          {skeleton ? (
            <Checkbox.Skeleton />
          ) : (
            <>
              <input
                type="radio"
                id={id}
                value={value}
                checked={checked}
                onChange={handleChange}
                className="nimbus--radio"
              />
              <div className="nimbus--radio-label" />
              {checked && (
                <div className="nimbus--radio__check">
                  <CheckIcon />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {renderBelow(description, labels)}
    </label>
  );
}

export default Item;
