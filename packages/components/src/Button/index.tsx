import * as React from "react";

import "./Button.css";

export interface InterfaceButton {
  /**
   * React node of type children.
   */
  children: React.ReactText;
  /**
   * type of react mouse event onclick to manage event click and void return.
   */
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  /**
   * Appearance
   */
  appearance?: "primary" | "secondary" | "default" | "danger";
  /**
   * Icon Component imported from @tiendanube/icons
   */
  icon?: any;
  /**
   * Position of the icon inside the button
   */
  iconPosition?: "start" | "end";
  /**
   * Indicates if the button is disabled
   */
  disabled?: boolean;
}

/**
 * Button's Component as actionable component.
 * @param icon Icon Component imported from @tiendanube/icons
 * @param iconPosition Position of the icon inside the button
 * @param children React node of type children.
 * @param appearance type of appearance "primary" | "secondary" | "default" | "danger"
 * @param disabled Indicates if the button is disabled
 */
function Button({
  children,
  icon: Icon,
  iconPosition,
  appearance,
  onClick,
  disabled,
}: InterfaceButton): JSX.Element {
  const classname = React.useMemo(
    () => `nimbus--button nimbus--button--${appearance}`,
    [appearance],
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

Button.defaultProps = {
  appearance: "default",
  iconPosition: "start",
  disabled: false,
};

export default React.memo(Button);
