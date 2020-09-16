import * as React from "react";

import "./IconItem.css";

import { ExternalLinkIcon, Icon as IconType } from "@tiendanube/icons";
import Link from "../Link";
import Text from "../Text";

export interface InterfaceIconItem {
  /**
   * Icon Component imported from @tiendanube/icons
   */
  icon: IconType;
  /**
   * Appearance of the IconItem determines the background color
   */
  appearance?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success";
  /**
   * Title for the IconItem
   */
  title: string;
  /**
   * Subtitle for the IconItem
   */
  subtitle?: string;
  /**
   * Link to display in the IconItem
   */
  link?: string;
  /**
   * Link Href
   */
  linkTo?: string;
}
/**
 * @param icon Icon Component imported from @tiendanube/icons
 * @param appearance Appearance of the IconItem determines the background color
 * @param title Title for the IconItem
 * @param subtitle Subtitle for the IconItem
 * @param link Link to display in the IconItem
 * @param linkTo Link Href
 */
function IconItem({
  icon: Icon,
  appearance,
  title,
  subtitle,
  link,
  linkTo,
}: InterfaceIconItem): JSX.Element {
  const classname = React.useMemo(
    () => `nimbus--icon-item__icon--${appearance}`,
    [appearance],
  );
  const memorizedSubtitle = React.useMemo(
    () => subtitle && <Text>{subtitle}</Text>,
    [subtitle],
  );
  const memorizedLink = React.useMemo(
    () =>
      link &&
      linkTo && (
        <Link icon={ExternalLinkIcon} iconPosition="end" href={linkTo}>
          {link}
        </Link>
      ),
    [link, linkTo],
  );
  return (
    <div className="nimbus--icon-item" role="status">
      <div className={classname} aria-label={title}>
        <Icon />
      </div>
      <div className="nimbus--icon-item__info">
        <Text>{title}</Text>
        {memorizedSubtitle}
        {memorizedLink}
      </div>
    </div>
  );
}

IconItem.defaultProps = {
  appearance: "default",
};

export default React.memo(IconItem);
