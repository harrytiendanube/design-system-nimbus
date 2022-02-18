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
  /**
   * Applies an ellipsis to overflowing content. Must specify amount of lines to
   * be trimmed using trimLines
   */
  trimText?: boolean;
  /**
   * Specifies the amount of lines of text to be visible before applying an
   * ellipsis for overflowing text
   */
  trimLines?: number;
}

function Span({
  children,
  size = "base",
  appearance = "default",
  background = false,
  bold = false,
  trimText = false,
  trimLines,
}: InterfaceTextSpan): JSX.Element {
  const className = classNames(
    "nimbus--text",
    "nimbus--text-span",
    `nimbus--text-size--${size}`,
    `nimbus--text-color--${appearance}`,
    { [`nimbus--text-background--${appearance}`]: background },
    { "nimbus--text--bold": bold },
    { "nimbus--text--trim": trimText },
    { [`nimbus--text--trim-${trimLines}`]: trimText },
  );
  return <span className={className}>{children}</span>;
}

export default Span;
