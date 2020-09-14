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
   * Appearance
   */
  appearance?: "primary" | "secondary" | "default" | "danger";
  /**
   * Defines whether the link should be underlined
   */
  underline?: boolean;
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
 * @param appearance Appearance
 * @param underline Defines whether the link should be underlined
 * @param icon Icon Component imported from @tiendanube/icons
 * @param iconPosition Position of the icon with respect to the alert
 */
const Link: React.FC<InterfaceLink> = ({
  children,
  href,
  target = "_blank",
  appearance = "default",
  underline = false,
  icon: Icon,
  iconPosition = "start",
}: InterfaceLink): JSX.Element => {
  const classname = React.useMemo(
    () =>
      `nimbus--link nimbus--link--${appearance} ${
        underline ? "nimbus--link--underlined" : ""
      }`,
    [appearance, underline],
  );
  const memorizedStartIcon = React.useMemo(
    () =>
      Icon &&
      iconPosition === "start" && (
        <i className="nimbus--link__icon--start">
          <Icon />
        </i>
      ),
    [Icon, iconPosition],
  );
  const memorizedEndIcon = React.useMemo(
    () =>
      Icon &&
      iconPosition === "end" && (
        <i className="nimbus--link__icon--end">
          <Icon />
        </i>
      ),
    [Icon, iconPosition],
  );
  return (
    <a className={classname} href={href} target={target}>
      {memorizedStartIcon}
      {children}
      {memorizedEndIcon}
    </a>
  );
};

export default React.memo(Link);
