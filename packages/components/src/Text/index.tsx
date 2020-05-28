import * as React from "react";
import "@tiendanube/styles/css/Text.css";

export interface InterfaceText {
  /**
   *
   */
  children: React.ReactNode;
  /**
   *  Size
   */
  size?: "regular";
}
/**
 *  @param children React node of type children.
 *  @param size  Size
 */
const Text: React.FC<InterfaceText> = ({
  children,
  size = "regular",
}: InterfaceText) => {
  return <p className={`nimbus--text nimbus--text_${size}`}>{children}</p>;
};

export default Text;
