import * as React from "react";

import "./Text.css";

export interface InterfaceText {
  /**
   * Text to be displayed
   */
  children: React.ReactText;
  /**
   *  Size
   */
  size?: "regular";
}
/**
 *  @param children Text to be displayed
 *  @param size  Size
 */
function Text({ children, size = "regular" }: InterfaceText): JSX.Element {
  return <p className={`nimbus--text nimbus--text_${size}`}>{children}</p>;
}

export default React.memo(Text) as typeof Text;
