import * as React from "react";
import classNames from "classnames";
import { CheckIcon, Icon as IconType } from "@tiendanube/icons";
import { Text, Checkbox, InterfaceLabel, InterfaceNameChecked } from "..";
import { renderBelow, renderIcon, renderBlockLeft } from "./utils";

export interface InterfaceInteractiveListRadioItem {
  /** Title */
  title: string;
  /** Description */
  description?: string;
  /** Labels */
  labels?: Pick<InterfaceLabel, "id" | "label" | "colorTag" | "appearance">[];
  /** Value */
  value: string;
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
}

function Item({
  title,
  description,
  labels,
  value,
  checked,
  skeleton,
  hideBorder,
  onChange,
  blockLeft,
  icon,
  iconAppearance,
}: InterfaceInteractiveListRadioItem): JSX.Element {
  const mainClass = classNames("nimbus--interactive-list-item", {
    "nimbus--interactive-list-item__borderBottom": hideBorder,
  });

  const id = `input_${title}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    onChange({ name: target.value, checked: target.checked });
  };

  return (
    <label htmlFor={id} className={mainClass} role="listitem">
      {renderBlockLeft(blockLeft)}
      <div className="nimbus--interactive-list-item__content">
        <div className="nimbus--interactive-list-item__title">
          {renderIcon(icon, iconAppearance)}
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
      </div>
    </label>
  );
}

export default Item;
