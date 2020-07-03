import * as React from "react";

import "./Button.css";
import Icon from "../Icon";

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
   * Icons's name to start in position left.
   */
  startIcon?: string;
  /**
   * Icons's name to start in position right.
   */
  endIcon?: string;
  /**
   * Transform button to outline version with a transparent background and border color determined by appearance prop.
   */
  outline?: boolean;
}

/**
 * Button's Component as actionable component.
 * @Param startIcon Icons's name to start in position left
 * @Param endIcon Icons's name to start in position left.
 * @Param children React node of type children.
 * @Param appearance type of appearance "primary" | "secondary" | "light" | "danger" | "transparent".
 * @Param outline Transform button to outline version with a transparent background and border color determined by appearance prop.
 */
function Button({
  children,
  startIcon,
  endIcon,
  appearance,
  outline,
  onClick,
}: InterfaceButton): JSX.Element {
  const classname = React.useMemo(
    () => `nimbus--button--${appearance}${outline ? "-outline" : ""}`,
    [appearance, outline],
  );
  const iconStart = React.useMemo(
    () => startIcon && <Icon name={startIcon} startPadding />,
    [startIcon],
  );
  const iconEnd = React.useMemo(
    () => endIcon && <Icon name={endIcon} endPadding />,
    [endIcon],
  );

  return (
    <button className={classname} onClick={onClick}>
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}

Button.defaultProps = {
  appearance: "light",
  outline: false,
};

export default React.memo(Button);
