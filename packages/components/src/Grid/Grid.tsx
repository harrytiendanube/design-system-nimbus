import * as React from "react";

import classNames from "classnames";

import { Row, Column } from "./components";

import "./Grid.css";

export { RowProps } from "./components/Row";
export { ColumnProps } from "./components/Column";

interface GridProps {
  /** React children of type Node */
  children: React.ReactNode;
  /** Grid takes up 100% of available container size */
  fluid?: boolean;
  /** Specifies the max width of the Grid container in px */
  maxWidth?: number;
  /** Defines spacing for rows and columns */
  spacing?: "none" | "tight" | "base" | "loose";
}

function Grid({
  children,
  fluid = false,
  spacing = "base",
  maxWidth = 1200,
}: GridProps): JSX.Element {
  const className = classNames(
    "nimbus--grid",
    `nimbus--grid--spacing-${spacing}`,
  );

  return (
    <div
      style={{ maxWidth: !fluid && maxWidth ? `${maxWidth}px` : "100%" }}
      className={className}
    >
      {children}
    </div>
  );
}

Grid.Row = Row;
Grid.Column = Column;

export default Grid;
