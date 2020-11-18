import * as React from "react";

import "./Label.css";

import classNames from "classnames";
import { Icon as IconType } from "@tiendanube/icons";

export interface InterfaceLabel {
  /** ID */
  id: string;
  /** Appearance */
  appearance?:
    | "primary"
    | "secondary"
    | "default"
    | "warning"
    | "danger"
    | "success"
    | "transparent";
  /** Icon Component imported from @tiendanube/icons */
  icon?: IconType;
  /** Text for the label */
  label: React.ReactText;
  /** Color value to display a tag */
  colorTag?: string;
  /** Event to be fired upon clicking the Label */
  onClick?: (id: string) => void;
}

function Label({
  id,
  appearance = "default",
  icon: Icon,
  label,
  onClick,
  colorTag,
}: InterfaceLabel): JSX.Element {
  if (Icon && colorTag) {
    throw new Error(
      "You can not use parameters 'icon' and 'colorTag' simultaneously",
    );
  }
  if (appearance !== "default" && colorTag) {
    throw new Error(
      "You can not use parameters 'appearance' and 'colorTag' simultaneously",
    );
  }
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    onClick?.(id);
  };

  const className = classNames("nimbus--label", `nimbus--label--${appearance}`);

  const tagStyle = {
    backgroundColor: colorTag,
  };

  return onClick ? (
    <button type="button" id={id} className={className} onClick={handleClick}>
      {Icon && <Icon />}
      {colorTag && (
        <span className="nimbus--label__color-tag" style={tagStyle} />
      )}
      {label}
    </button>
  ) : (
    <span id={id} className={className} role="status">
      {Icon && <Icon />}
      {colorTag && (
        <span className="nimbus--label__color-tag" style={tagStyle} />
      )}
      {label}
    </span>
  );
}

const Skeleton = () => <span className="nimbus--label-skeleton" />;

Label.Skeleton = Skeleton;

export default Label;
