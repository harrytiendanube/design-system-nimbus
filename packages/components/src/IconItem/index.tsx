import * as React from "react";

import "./IconItem.css";

import { ExternalLinkIcon, Icon as IconType } from "@tiendanube/icons";
import Link, { InterfaceLink } from "../Link";
import Text from "../Text";

export interface InterfaceIconItem {
  /** Icon Component imported from @tiendanube/icons */
  icon: IconType;
  /** Appearance of the IconItem determines the background color */
  appearance?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success";
  /** Title for the IconItem */
  title: string;
  /** Subtitle for the IconItem */
  subtitle?: string;
  /** Link to display in the IconItem */
  link?: Pick<InterfaceLink, "children" | "href" | "onClick">;
}

function IconItem({
  icon: Icon,
  appearance = "default",
  title,
  subtitle,
  link,
}: InterfaceIconItem): JSX.Element {
  const classname = `nimbus--icon-item__icon--${appearance}`;

  const renderSubtitle = subtitle && <Text>{subtitle}</Text>;

  const renderLink = link && (
    <Link
      icon={ExternalLinkIcon}
      iconPosition="end"
      href={link.href}
      onClick={link.onClick}
    >
      {link.children}
    </Link>
  );

  return (
    <div className="nimbus--icon-item" role="status">
      <div className={classname} aria-label={title}>
        <Icon />
      </div>
      <div className="nimbus--icon-item__info">
        <Text>{title}</Text>
        {renderSubtitle}
        {renderLink}
      </div>
    </div>
  );
}

export default IconItem;
