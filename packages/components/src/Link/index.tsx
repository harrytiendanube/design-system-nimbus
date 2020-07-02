import * as React from "react";
import "./Link.css";

import Icon from "../Icon";

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
   * Icons's name to start in position left.
   */
  startIcon?: string;
  /**
   * Icons's name to start in position right.
   */
  endIcon?: string;
}

/**
 * @param start React node of type children.
 * @param href Specifies the URL of the page the link goes to
 * @param target Specifies where to open the linked document
 * @param startIcon Icons's name to start in position left
 * @param endIcon Icons's name to start in position left.
 */
const Link: React.FC<InterfaceLink> = ({
  children,
  href,
  target = "_blank",
  startIcon,
  endIcon,
}: InterfaceLink) => {
  const memorizedStartIcon = React.useMemo(
    () => startIcon && <Icon name={startIcon} startPadding />,
    [startIcon],
  );
  const memorizedEndIcon = React.useMemo(
    () => endIcon && <Icon name={endIcon} endPadding />,
    [endIcon],
  );
  return (
    <a className="nimbus--link" href={href} target={target}>
      {memorizedStartIcon}
      {children}
      {memorizedEndIcon}
    </a>
  );
};

export default React.memo(Link) as typeof Link;
