import * as React from "react";

import "./Row.css";

export interface RowProps {
  /** React children of type Node */
  children: React.ReactNode;
}

function Row({ children }: RowProps): JSX.Element {
  return <div className="nimbus--grid__row">{children}</div>;
}

export default Row;
