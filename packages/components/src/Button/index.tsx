import * as React from "react";

import "./Button.css";

import classNames from "classnames";
import { Icon as IconType } from "@tiendanube/icons";
import { Spinner, Badge } from "..";

export interface InterfaceButton {
  /** React node of type children. */
  children?: React.ReactText;
  /** Label used for accessibility. */
  ariaLabel?: string;
  /** Type of appearance */
  appearance?: "default" | "primary" | "secondary" | "default" | "danger";
  /** Determines whether the button shows a badge */
  badge?: React.ReactText;
  /** Icon Component imported from @tiendanube/icons */
  icon?: IconType;
  /** Position of the icon inside the button */
  iconPosition?: "start" | "end";
  /** The size of the button icon */
  iconSize?: "small" | "medium" | "large";
  /** Indicates if the button is disabled */
  disabled?: boolean;
  /** If true, will render a spinner at start position */
  spinner?: boolean;
  /** Type of react mouse event onclick to manage event click and void return. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Type of react event to manage blur and void return. */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** The type of button */
  type?: "button" | "submit" | "reset";
}

function Button({
  children,
  ariaLabel,
  badge,
  icon: Icon,
  iconPosition = "start",
  appearance = "default",
  onClick,
  onBlur,
  disabled = false,
  iconSize = "small",
  spinner,
  type = "button",
}: InterfaceButton): JSX.Element {
  const buttonClass = classNames(
    "nimbus--button",
    `nimbus--button--${appearance}`,
    { "nimbus--button-loading": spinner },
  );

  const iconSpinner = spinner && <Spinner />;

  const iconStart = !spinner && Icon && iconPosition === "start" && (
    <Icon size={iconSize} />
  );

  const iconEnd = !spinner && Icon && iconPosition === "end" && (
    <Icon size={iconSize} />
  );

  const buttonBadge = badge && <Badge appearance={appearance} label={badge} />;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (typeof onClick === "function") {
      onClick?.(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (typeof onClick === "function") {
      onBlur?.(e);
    }
  };

  return (
    <button
      aria-label={ariaLabel}
      type={type}
      className={buttonClass}
      onClick={handleClick}
      onBlur={handleBlur}
      disabled={disabled}
    >
      {iconSpinner}
      {iconStart}
      {children}
      {buttonBadge}
      {iconEnd}
    </button>
  );
}

const Skeleton = () => <div className="nimbus--button-skeleton" />;

Button.Skeleton = Skeleton;

export default Button;
