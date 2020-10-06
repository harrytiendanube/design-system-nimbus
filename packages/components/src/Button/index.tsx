import * as React from "react";

import "./Button.css";

import classNames from "classnames";
import { Icon as IconType } from "@tiendanube/icons";

export interface InterfaceButton {
  /** React node of type children. */
  children?: React.ReactText;
  /** Type of appearance */
  appearance?: "default" | "primary" | "secondary" | "default" | "danger";
  /** Icon Component imported from @tiendanube/icons */
  icon?: IconType;
  /** Position of the icon inside the button */
  iconPosition?: "start" | "end";
  /** The size of the button icon */
  iconSize?: "small" | "medium" | "large";
  /** Indicates if the button is disabled */
  disabled?: boolean;
  /** Indicates if the button should be styled as a link */
  link?: boolean;
  /** If true, will render a spinner at start position */
  spinner?: boolean;
  /** Type of react mouse event onclick to manage event click and void return. */
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

/**
 * Button's Component as actionable component.
 *
 * @param children React node of type children
 * @param appearance Type of appearance
 * @param icon Icon Component imported from @tiendanube/icons
 * @param iconPosition Position of the icon inside the button
 * @param iconSize The size of the button icon
 * @param disabled Indicates if the button is disabled
 * @param link Indicates if the button should be styled as a link
 * @param spinner If true, will render a spinner at start position
 * @param onClick Type of react mouse event onclick to manage event click and
 */
const Button = React.memo(function Button({
  children,
  icon: Icon,
  iconPosition = "start",
  appearance = "default",
  onClick,
  disabled = false,
  link = false,
  iconSize = "small",
  spinner,
}: InterfaceButton): JSX.Element {
  const buttonClass = React.useMemo(
    () =>
      classNames(
        "nimbus--button",
        { [`nimbus--link--${appearance}`]: link },
        { [`nimbus--button--${appearance}`]: !link },
        { "nimbus--button-loading": spinner },
      ),
    [appearance, link, spinner],
  );
  const iconStartClass = React.useMemo(
    () =>
      classNames({
        "nimbus--button__icon--start": iconPosition === "start" && children,
      }),
    [children, iconPosition],
  );
  const iconEndClass = React.useMemo(
    () =>
      classNames({
        "nimbus--button__icon--end": iconPosition === "end" && children,
      }),
    [children, iconPosition],
  );

  const iconSpinner = React.useMemo(
    () => spinner && <span className="nimbus--button-spinner" />,
    [spinner],
  );

  const iconStart = React.useMemo(
    () =>
      !spinner &&
      Icon &&
      iconPosition === "start" && (
        <i className={iconStartClass}>
          <Icon size={iconSize} />
        </i>
      ),
    [spinner, Icon, iconPosition, iconSize, iconStartClass],
  );
  const iconEnd = React.useMemo(
    () =>
      !spinner &&
      Icon &&
      iconPosition === "end" && (
        <i className={iconEndClass}>
          <Icon size={iconSize} />
        </i>
      ),
    [spinner, Icon, iconEndClass, iconPosition, iconSize],
  );

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {iconSpinner}
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}) as React.NamedExoticComponent<InterfaceButton> & {
  Skeleton: typeof Skeleton;
};

const Skeleton = () => <div className="nimbus--button-skeleton" />;

Button.Skeleton = Skeleton;

export default Button;
