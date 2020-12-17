import * as React from "react";

import classNames from "classnames";

export interface InterfaceTextSpan {
  /** React node of type children */
  children: React.ReactNode;
  /** Size */
  size?: "featured" | "base" | "small";
  /** Text color */
  appearance?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "light";
  /** Text background */
  background?: boolean;
  /** Bold font for the text component */
  bold?: boolean;
}
/**
 * @param children Text to be displayed
 * @param size Size
 * @param block Defines if the text is to be rendered as a block element
 * @param appearance Text color
 * @param background Text background
 * @param bold Bold font for the text component
 * @param textAlign Text alignment
 */
function Span({
  children,
  size = "base",
  appearance = "default",
  background = false,
  bold = false,
}: InterfaceTextSpan): JSX.Element {
  const className = classNames(
    "nimbus--text",
    "nimbus--text-span",
    `nimbus--text-size--${size}`,
    `nimbus--text-color--${appearance}`,
    { [`nimbus--text-background--${appearance}`]: background },
    { "nimbus--text--bold": bold },
  );
  return <span className={className}>{children}</span>;
}

export default Span;
