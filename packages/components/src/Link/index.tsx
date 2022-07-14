import * as React from "react";
import { Icon as IconType } from "@tiendanube/icons";

import "./Link.css";

import classNames from "classnames";

import { Spinner } from "..";

export interface InterfaceLink {
  /** React node of type children. */
  children?: React.ReactNode;
  /** Specifies the URL of the page the link goes to */
  href?: string;
  /** Specifies where to open the linked document */
  target?: "_blank" | "_parent" | "_self" | "_top";
  /** Appearance */
  appearance?: "primary" | "secondary" | "default" | "danger";
  /** Defines whether the link should be underlined */
  underline?: boolean;
  /** Icon Component imported from @tiendanube/icons */
  icon?: IconType;
  /** Position of the icon with respect to the alert */
  iconPosition?: "start" | "end";
  /** The size of the button icon */
  iconSize?: "small" | "medium" | "large";
  /** Indicates if the link is disabled */
  disabled?: boolean;
  /** If true, will render a spinner at start position */
  spinner?: boolean;
  /** OnClick callback function */
  onClick?: () => void;
  /** Specifies the name file to download */
  download?: string;
  /** Determines font size for the link */
  size?: "base" | "small";
}

function Link({
  children,
  href,
  target = "_blank",
  appearance = "default",
  underline = false,
  icon: Icon,
  iconPosition = "start",
  iconSize = "small",
  disabled = false,
  spinner = false,
  download,
  onClick,
  size = "base",
}: InterfaceLink): JSX.Element {
  const classname = classNames(
    "nimbus--link",
    `nimbus--link--${appearance}`,
    `nimbus--link--${size}`,
    { "nimbus--link--underlined": underline },
    { "nimbus--link--disabled": disabled },
    { "nimbus--link--loading": spinner },
  );

  const iconStartClass = classNames("nimbus--link__icon", {
    "nimbus--link__icon--start": iconPosition === "start" && children,
  });

  const iconEndClass = classNames("nimbus--link__icon", {
    "nimbus--link__icon--end": iconPosition === "end" && children,
  });

  const iconSpinner = spinner && <Spinner />;

  const renderStartIcon = !spinner && Icon && iconPosition === "start" && (
    <i className={iconStartClass}>
      <Icon size={iconSize} />
    </i>
  );

  const renderEndIcon = !spinner && Icon && iconPosition === "end" && (
    <i className={iconEndClass}>
      <Icon size={iconSize} />
    </i>
  );

  const handleOnClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!href) {
      event.preventDefault();
    }
    event.stopPropagation();
    onClick?.();
  };

  return (
    <a
      className={classname}
      href={href}
      onClick={handleOnClick}
      target={href && target}
      download={download}
    >
      {iconSpinner}
      {renderStartIcon}
      {children}
      {renderEndIcon}
    </a>
  );
}

const Skeleton = () => <div className="nimbus--link-skeleton" />;

Link.Skeleton = Skeleton;

export default Link;
