import * as React from "react";

import { Title, Text, Link } from "../";
import "@tiendanube/styles/css/Header.css";

export interface InterfaceHeader {
  /**
   * Title text
   */
  title: string;
  /**
   * Subtitle text
   */
  subtitle?: string;
  /**
   * Link text
   */
  link?: string;
  /**
   * Link href
   */
  linkTo?: string;
}

// TODO: Replace name 'Header' with 'PageHeader'
/**
 *  @param title is the title text
 *  @param subtitle is the subtitle text
 *  @param link is the link text
 *  @param linkTo is the link href
 */
function Header({
  title,
  subtitle,
  link,
  linkTo,
}: InterfaceHeader): JSX.Element {
  const memorizedSubtitle = React.useMemo(
    () => subtitle && <Text>{subtitle}</Text>,
    [subtitle],
  );
  const memorizedLink = React.useMemo(
    () => link && linkTo && <Link href={linkTo}>{link}</Link>,
    [linkTo, link],
  );

  return (
    <div className="nimbus--header">
      <Title>{title}</Title>
      {memorizedSubtitle}
      {memorizedLink}
    </div>
  );
}

export default React.memo(Header);
