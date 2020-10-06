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
  /** Event to be fired upon clicking the Label */
  onClick?: (id: string) => void;
}
/**
 * @param id ID
 * @param appearance Appearance
 * @param icon Icon Component imported from @tiendanube/icons
 * @param label Text for the label
 * @param onClick Event to be fired upon clicking the Label
 */
const Label = React.memo(function Label({
  id,
  appearance = "default",
  icon: Icon,
  label,
  onClick,
}: InterfaceLabel) {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    onClick?.(id);
  };

  const className = classNames("nimbus--label", `nimbus--label--${appearance}`);

  return onClick ? (
    <button type="button" id={id} className={className} onClick={handleClick}>
      {Icon && <Icon />}
      {label}
    </button>
  ) : (
    <span id={id} className={className} role="status">
      {Icon && <Icon />}
      {label}
    </span>
  );
}) as React.NamedExoticComponent<InterfaceLabel> & {
  Skeleton: typeof Skeleton;
};

const Skeleton = () => <span className="nimbus--label-skeleton" />;

Label.Skeleton = Skeleton;

export default Label;
