import * as React from "react";
import classNames from "classnames";

import { Icon as IconType } from "@tiendanube/icons";
import { Text } from "..";

export interface InterfaceKeyboardToolbarButton {
  /** Label used for a11y. It remains invisible unless no icon is provided */
  label: string;
  /**
   * Icon for the trigger button. If no icon is given, the text label will be
   * visible
   */
  icon?: IconType;
  /** Event fired when activating the button */
  onClick: () => void;
  /** Whether the button is on active state */
  active?: boolean;
  /** Whether the trigger button is disabled */
  disabled?: boolean;
}

function Button({
  icon: Icon,
  label,
  onClick,
  active = false,
  disabled = false,
}: InterfaceKeyboardToolbarButton): JSX.Element {
  const className = classNames("nimbus--keyboard-toolbar-button", {
    "is--active": active,
  });

  return (
    <button
      aria-label={label}
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="nimbus--keyboard-toolbar-button__wrapper"
    >
      <div className={className}>
        {Icon ? (
          <Icon />
        ) : (
          <Text size="small" block>
            {label}
          </Text>
        )}
      </div>
    </button>
  );
}

export default Button;
