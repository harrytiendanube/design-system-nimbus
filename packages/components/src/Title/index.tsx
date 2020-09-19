import * as React from "react";

import "./Title.css";

export interface InterfaceTitle {
  /** Heading type of html heading */
  children: React.ReactText;
  /** Element inside tag component */
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * @param children Element inside tag component
 * @param type Heading type of html heading
 */
function Title({ children, type = "h1" }: InterfaceTitle): JSX.Element {
  return React.createElement(
    type,
    { className: `nimbus--title-${type}` },
    children,
  );
}

export default React.memo(Title);
