import * as React from "react";
import classNames from "classnames";
import { CheckIcon, Icon as IconType } from "@tiendanube/icons";
import { Text, InterfaceLabel, Checkbox } from "..";
import { renderBelow, renderIcon, renderBlockLeft } from "./utils";
import { InterfaceNameChecked } from "../common/interfaces";

export interface InterfaceInteractiveListCheckItem {
  /** Title */
  title: string;
  /** Name */
  name: string;
  /** Description */
  description?: string;
  /** Labels */
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag" | "appearance">[];
  /** Checked value */
  checked?: boolean;
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
  /** Disabled some option */
  disabled?: boolean;
}

function Item({
  title,
  name,
  description,
  labels,
  checked,
  skeleton,
  hideBorder,
  onChange,
  blockLeft,
  icon,
  iconAppearance,
  disabled,
}: InterfaceInteractiveListCheckItem): JSX.Element {
  const mainClass = classNames("nimbus--interactive-list-item", {
    "nimbus--interactive-list-item__borderBottom": hideBorder,
    "nimbus--interactive-list-disabled": disabled,
  });

  const id = `input_${name}_ID`;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (!disabled) onChange({ name: target.name, checked: target.checked });
  };

  return (
    <label htmlFor={id} className={mainClass} role="listitem">
      {renderBlockLeft(blockLeft)}
      <div className="nimbus--interactive-list-item__content">
        <div className="nimbus--interactive-list-item__title">
          {renderIcon(icon, iconAppearance)}
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
      </div>
    </label>
  );
}

export default Item;
