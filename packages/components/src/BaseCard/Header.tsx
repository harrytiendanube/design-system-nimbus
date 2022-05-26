import * as React from "react";
import classNames from "classnames";
import { InterfaceContent } from "./types";

function Header({ children, padding = "base" }: InterfaceContent): JSX.Element {
  const className = classNames(
    "nimbus--base-card__header",
    `padding--${padding}`,
  );
  return <div className={className}>{children}</div>;
}

export default Header;
