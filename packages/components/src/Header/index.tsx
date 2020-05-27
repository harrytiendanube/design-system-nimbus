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
