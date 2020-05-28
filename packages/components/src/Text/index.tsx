import * as React from "react";
import "@tiendanube/styles/css/Text.css";

export interface InterfaceText {
  /**
   *  React node of type children.
   */
  children: React.ReactNode;
  /**
   *  Size
   */
  size?: "regular";
}

const Text: React.FC<InterfaceText> = ({
  children,
  size = "regular",
}: InterfaceText) => {
  return <p className={`nimbus--text nimbus--text_${size}`}>{children}</p>;
};

export default Text;
