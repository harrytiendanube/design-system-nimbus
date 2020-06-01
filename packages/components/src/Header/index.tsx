import * as React from "react";

import { Title, Text, Link } from "../";
import "@tiendanube/styles/css/Header.css";

export interface InterfaceHeader {
  /**
   * Title text
   */
  titleText: string;
  /**
   * Subtitle text
   */
  subtitleText?: string;
  /**
   * Link text
   */
  linkText?: string;
  /**
   * Link href
   */
  linkHref?: string;
}

// TODO: Replace name 'Header' with 'PageHeader'
/**
 *  @param titleText is the title text
 *  @param subtitleText is the subtitle text
 *  @param linkText is the link text
 *  @param linkHref is de link href
 */
function Header({
  titleText,
  subtitleText,
  linkText,
  linkHref,
}: InterfaceHeader): JSX.Element {
  const memorizedSubtitle = React.useMemo(
    () => subtitleText && <Text>{subtitleText}</Text>,
    [subtitleText],
  );
  const memorizedLink = React.useMemo(
    () => linkText && <Link href={linkHref}>{linkText}</Link>,
    [linkHref, linkText],
  );

  return (
    <div className="nimbus--header">
      <Title>{titleText}</Title>
      {memorizedSubtitle}
      {memorizedLink}
    </div>
  );
}

export default React.memo(Header);
