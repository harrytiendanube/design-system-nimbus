import * as React from "react";
import "./Link.css";

export interface InterfaceLink {
  /**
   *  React node of type children.
   */
  children: React.ReactNode;
  /**
   *  Specifies the URL of the page the link goes to
   */
  href: string;
  /**
   *  Specifies where to open the linked document
   */
  target?: "_blank" | "_parent" | "_self" | "_top";
  /**
   * Icon Component imported from @tiendanube/icons
   */
  icon?: any;
  /**
   * Position of the icon with respect to the alert
   */
  iconPosition?: "start" | "end";
}
/**
 * @param start React node of type children.
 * @param href Specifies the URL of the page the link goes to
 * @param target Specifies where to open the linked document
 * @param icon Icon Component imported from @tiendanube/icons
 * @param iconPosition Position of the icon with respect to the alert
 */
const Link: React.FC<InterfaceLink> = ({
  children,
  href,
  target,
  icon: Icon,
  iconPosition,
}: InterfaceLink) => {
  const memorizedStartIcon = React.useMemo(
    () => Icon && iconPosition == "start" && <Icon />,
    [Icon, iconPosition]
  );
  const memorizedEndIcon = React.useMemo(
    () => Icon && iconPosition == "end" && <Icon />,
    [Icon, iconPosition]
  );
  return (
    <a className="nimbus--link" href={href} target={target}>
      {memorizedStartIcon}
      {children}
      {memorizedEndIcon}
    </a>
  );
};

Link.defaultProps = {
  target: "_blank",
  iconPosition: "start",
};

export default React.memo(Link);
