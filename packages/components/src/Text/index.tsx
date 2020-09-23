import * as React from "react";

import classNames from "classnames";
import "./Text.css";

export interface InterfaceText {
  /** Text to be displayed */
  children: React.ReactText;
  /** Size */
  size?: "base" | "small";
  /** Defines if the text is to be rendered as a block element */
  block?: boolean;
  /** Text color */
  appearance?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
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
 */
function Text({
  children,
  size = "base",
  block = false,
  appearance = "default",
  background = false,
  bold = false,
}: InterfaceText): JSX.Element {
  const className = React.useMemo(
    () =>
      classNames(
        "nimbus--text",
        `nimbus--text-size--${size}`,
        `nimbus--text-color--${appearance}`,
        { [`nimbus--text-background--${appearance}`]: background },
        { "nimbus--text--block": block },
        { "nimbus--text--bold": bold },
      ),
    [appearance, background, bold, block, size],
  );
  return <p className={className}>{children}</p>;
}

export default React.memo(Text);
