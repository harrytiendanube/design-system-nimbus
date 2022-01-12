import * as React from "react";

import classNames from "classnames";

import "./Column.css";

export interface ColumnProps {
  /** React children of type Node */
  children: React.ReactNode;
  /** Defines the width of the column on small breakpoint (mobile) */
  sm?: number;
  /** Defines the width of the column on medium breakpoint (tablet) */
  md?: number;
  /** Defines the width of the column on large breakpoint (desktop) */
  lg?: number;
}

function Column({ children, sm, md, lg }: ColumnProps): JSX.Element {
  const className = classNames(
    "nimbus--grid__column",
    `nimbus--grid__column--sm-${sm}`,
    `nimbus--grid__column--md-${md}`,
    `nimbus--grid__column--lg-${lg}`,
  );

  return <div className={className}>{children}</div>;
}

export default Column;
