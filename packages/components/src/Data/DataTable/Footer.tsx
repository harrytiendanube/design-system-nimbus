import classNames from "classnames";
import * as React from "react";

export interface InterfaceDataTableFooter {
  /** React node of type children */
  children: React.ReactNode;
}

function Footer({ children }: InterfaceDataTableFooter): JSX.Element {
  const className = classNames("nimbus--data-table__footer");

  return <div className={className}>{children}</div>;
}

export default Footer;
