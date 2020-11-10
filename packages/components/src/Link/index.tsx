import * as React from "react";
import { Icon as IconType } from "@tiendanube/icons";

import "./Link.css";

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
  /** OnClick callback function */
  onClick?: () => void;
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
  onClick,
}: InterfaceLink): JSX.Element {
  const classname = `nimbus--link nimbus--link--${appearance} ${
    underline ? "nimbus--link--underlined" : ""
  }`;

  const renderStartIcon = Icon && iconPosition === "start" && (
    <i className="nimbus--link__icon--start">
      <Icon size={iconSize} />
    </i>
  );

  const renderEndIcon = Icon && iconPosition === "end" && (
    <i className="nimbus--link__icon--end">
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
      target={target}
    >
      {renderStartIcon}
      {children}
      {renderEndIcon}
    </a>
  );
}

const Skeleton = () => <div className="nimbus--link-skeleton" />;

Link.Skeleton = Skeleton;

export default Link;
