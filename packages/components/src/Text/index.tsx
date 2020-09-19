import * as React from "react";

import "./Text.css";

export interface InterfaceText {
  /** Text to be displayed */
  children: React.ReactText;
  /** Size */
  size?: "regular" | "small";
}
/**
 * @param children Text to be displayed
 * @param size Size
 */
function Text({ children, size }: InterfaceText): JSX.Element {
  return <p className={`nimbus--text nimbus--text_${size}`}>{children}</p>;
}

Text.defaultProps = { size: "regular" };

export default React.memo(Text);
