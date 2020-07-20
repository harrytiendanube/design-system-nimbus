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
  appearance?: "primary" | "secondary" | "light" | "danger";
  /**
   * Icon Component imported from @tiendanube/icons
   */
  icon?: any;
  /**
   * Position of the icon inside the button
   */
  iconPosition?: "start" | "end";
  /**
   * Transform button to outline version with a transparent background and border color determined by appearance prop.
   */
  outline?: boolean;
}

/**
 * Button's Component as actionable component.
 * @param icon Icon Component imported from @tiendanube/icons
 * @param iconPosition Position of the icon inside the button
 * @param children React node of type children.
 * @param appearance type of appearance "primary" | "secondary" | "light" | "danger" | "transparent".
 * @param outline Transform button to outline version with a transparent background and border color determined by appearance prop.
 */
function Button({
  children,
  icon: Icon,
  iconPosition,
  appearance,
  outline,
  onClick,
}: InterfaceButton): JSX.Element {
  const classname = React.useMemo(
    () => `nimbus--button--${appearance}${outline ? "-outline" : ""}`,
    [appearance, outline],
  );
  const iconStart = React.useMemo(
    () => Icon && iconPosition === "start" && <Icon />,
    [Icon, iconPosition],
  );
  const iconEnd = React.useMemo(
    () => Icon && iconPosition === "end" && <Icon />,
    [Icon, iconPosition],
  );

  return (
    <button type="button" className={classname} onClick={onClick}>
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}

Button.defaultProps = {
  appearance: "light",
  iconPosition: "start",
  outline: false,
};

export default React.memo(Button);
