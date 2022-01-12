import * as React from "react";

import classNames from "classnames";

import { Row, Column } from "./components";

import "./Grid.css";

export { RowProps } from "./components/Row";
export { ColumnProps } from "./components/Column";

interface GridProps {
  /** React children of type Node */
  children: React.ReactNode;
  /**
   * Grid takes up 100% of available container size. If false with default to
   * max 1200px
   */
  fluid?: boolean;
  /** Defines spacing for rows and columns */
  spacing?: "none" | "tight" | "base" | "loose";
}

function Grid({
  children,
  fluid = false,
  spacing = "base",
}: GridProps): JSX.Element {
  const className = classNames(
    "nimbus--grid",
    `nimbus--grid--spacing-${spacing}`,
    { "nimbus--grid--fluid": fluid },
  );

  return <div className={className}>{children}</div>;
}

Grid.Row = Row;
Grid.Column = Column;

export default Grid;
