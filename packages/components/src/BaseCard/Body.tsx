import * as React from "react";
import classNames from "classnames";
import { InterfaceContent } from "./types";

function Body({ children, padding = "base" }: InterfaceContent): JSX.Element {
  const className = classNames(
    "nimbus--base-card__body",
    `padding--${padding}`,
  );
  return <div className={className}>{children}</div>;
}

export default Body;
