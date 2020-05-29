import * as React from "react";

import "@tiendanube/styles/css/Title.css";

export interface InterfaceTitle
  extends Omit<
    React.HTMLAttributes<HTMLHeadingElement>,
    "className" | "style"
  > {
  /**
   * Heading type of html heading
   */
  children: React.ReactText;
  /**
   * Element inside tag component
   */
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * @param children - Element inside tag component
 * @param type - Heading type of html heading
 */
function Title({
  children,
  type = "h1",
  ...share
}: InterfaceTitle): JSX.Element {
  const HeadTag = `${type}`;

  const classesTypes = {
    // TODO: replace values 01, 02, 03 to  h1, h2, h3, etc.
    h1: "nimbus--title-01",
    h2: "nimbus--title-02",
    h3: "nimbus--title-03",
    h4: "nimbus--title-04",
    h5: "nimbus--title-05",
    h6: "nimbus--title-06",
  };
  const props = Object.assign({}, share, { className: classesTypes[type] });
  return <HeadTag {...props}>{children}</HeadTag>;
}

export default Title;
