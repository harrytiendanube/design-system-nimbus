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

const Header: React.FC<InterfaceHeader> = ({
  titleText,
  subtitleText,
  linkText,
  linkHref,
}: InterfaceHeader) => {
  return (
    <React.Fragment>
      <Title>{titleText}</Title>
      {subtitleText && <Text>{subtitleText}</Text>}
      {linkText && <Link href={linkHref}>{linkText}</Link>}
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
