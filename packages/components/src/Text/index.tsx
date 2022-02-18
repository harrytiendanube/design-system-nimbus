import * as React from "react";

import classNames from "classnames";

import Span from "./Text.Span";
import Skeleton from "./Text.Skeleton";
import "./Text.css";

export { InterfaceTextSpan } from "./Text.Span";

export interface InterfaceText {
  /** Text to be displayed */
  children: React.ReactNode;
  /** Size */
  size?: "featured" | "base" | "small";
  /** Defines if the text is to be rendered as a block element */
  block?: boolean;
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
  /** Text alignment */
  textAlign?: "left" | "right" | "center";
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

const Text = React.memo(function Text({
  children,
  size = "base",
  block = false,
  appearance = "default",
  background = false,
  bold = false,
  textAlign = "left",
  trimText = false,
  trimLines,
}: InterfaceText): JSX.Element {
  const className = classNames(
    "nimbus--text",
    `nimbus--text-size--${size}`,
    `nimbus--text-color--${appearance}`,
    `nimbus--text-align--${textAlign}`,
    { [`nimbus--text-background--${appearance}`]: background },
    { "nimbus--text--block": block },
    { "nimbus--text--bold": bold },
    { "nimbus--text--trim": trimText },
    { [`nimbus--text--trim-${trimLines}`]: trimText },
  );

  return <p className={className}>{children}</p>;
}) as React.NamedExoticComponent<InterfaceText> & {
  Skeleton: typeof Skeleton;
} & {
  Span: typeof Span;
};

Text.Span = Span;
Text.Skeleton = Skeleton;

export default Text;
