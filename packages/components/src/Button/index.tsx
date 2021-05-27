import * as React from "react";

import "./Button.css";

import classNames from "classnames";
import { Icon as IconType } from "@tiendanube/icons";
import { Spinner } from "..";

export interface InterfaceButton {
  /** React node of type children. */
  children?: React.ReactText;
  /** Label used for accessibility. */
  ariaLabel?: string;
  /** Type of appearance */
  appearance?: "default" | "primary" | "secondary" | "default" | "danger";
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
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

function Button({
  children,
  ariaLabel,
  badge,
  icon: Icon,
  iconPosition = "start",
  appearance = "default",
  onClick,
  disabled = false,
  iconSize = "small",
  spinner,
}: InterfaceButton): JSX.Element {
  const buttonClass = classNames(
    "nimbus--button",
    `nimbus--button--${appearance}`,
    { "nimbus--button-loading": spinner },
  );

  const iconStartClass = classNames("nimbus--button__icon", {
    "nimbus--button__icon--start":
      (iconPosition === "start" && children) || badge,
  });

  const iconEndClass = classNames("nimbus--button__icon", {
    "nimbus--button__icon--end": (iconPosition === "end" && children) || badge,
  });

  const badgeClass = classNames("nimbus--button__badge", {
    "nimbus--button__badge--margin": children,
  });

  const iconSpinner = spinner && <Spinner />;

  const iconStart = !spinner && Icon && iconPosition === "start" && (
    <i className={iconStartClass}>
      <Icon size={iconSize} />
    </i>
  );

  const iconEnd = !spinner && Icon && iconPosition === "end" && (
    <i className={iconEndClass}>
      <Icon size={iconSize} />
    </i>
  );

  const buttonBadge = badge && <span className={badgeClass}>{badge}</span>;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onClick(e);
  };

  return (
    <button
      aria-label={ariaLabel}
      type="button"
      className={buttonClass}
      onClick={handleClick}
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
