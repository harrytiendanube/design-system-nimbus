import * as React from "react";
import classNames from "classnames";
import { InterfaceContent } from "./types";

function Footer({ children, padding = "base" }: InterfaceContent): JSX.Element {
  const className = classNames(
    "nimbus--base-card__footer",
    `padding--${padding}`,
  );
  return <div className={className}>{children}</div>;
}

export default Footer;
