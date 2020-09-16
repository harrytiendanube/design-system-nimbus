import * as React from "react";

import "./Button.css";

import { Icon as IconType } from "@tiendanube/icons";

export interface InterfaceButton {
  /**
   * React node of type children.
   */
  children?: React.ReactText;
  /**
   * type of react mouse event onclick to manage event click and void return.
   */
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  /**
   * Appearance
   */
  appearance?: "default" | "primary" | "secondary" | "default" | "danger";
  /**
   * Icon Component imported from @tiendanube/icons
   */
  icon?: IconType;
  /**
   * Position of the icon inside the button
   */
  iconPosition?: "start" | "end";
  /**
   * Indicates if the button is disabled
   */
  disabled?: boolean;
  /**
   * Indicates if the button should be styled as a link
   */
  link?: boolean;
}

/**
 * Button's Component as actionable component.
 * @param icon Icon Component imported from @tiendanube/icons
 * @param iconPosition Position of the icon inside the button
 * @param children React node of type children.
 * @param appearance type of appearance "primary" | "secondary" | "default" | "danger"
 * @param disabled Indicates if the button is disabled
 * @param link Indicates if the button should be styled as a link
 */
function Button({
  children,
  icon: Icon,
  iconPosition = "start",
  appearance = "default",
  onClick,
  disabled = false,
  link = false,
}: InterfaceButton): JSX.Element {
  const classname = React.useMemo(
    () =>
      `nimbus--button ${
        link ? "nimbus--link--" : "nimbus--button--"
      }${appearance}`,
    [appearance, link],
  );
  const iconStart = React.useMemo(
    () =>
      Icon &&
      iconPosition === "start" && (
        <i className="nimbus--button__icon--start">
          <Icon />
        </i>
      ),
    [Icon, iconPosition],
  );
  const iconEnd = React.useMemo(
    () =>
      Icon &&
      iconPosition === "end" && (
        <i className="nimbus--button__icon--end">
          <Icon />
        </i>
      ),
    [Icon, iconPosition],
  );

  return (
    <button
      type="button"
      className={classname}
      onClick={onClick}
      disabled={disabled}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}

export default React.memo(Button);
