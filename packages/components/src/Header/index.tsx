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
  return (
    <div>
      <Title>{titleText}</Title>
      {subtitleText && <Text>{subtitleText}</Text>}
      {linkText && <Link href={linkHref}>{linkText}</Link>}
    </div>
  );
}

export default Header;
