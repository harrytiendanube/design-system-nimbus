import * as React from "react";
import classNames from "classnames";

export interface InterfaceDataListCell {
  /** React node of type children */
  children?: React.ReactNode;
  /** Defines the span the columns can stretch to */
  grow?: 0 | 1 | 2 | 3 | 4;
  /** Specifies the minimum size of a column */
  basis?: number;
  /** Trim text longer than one line */
  trimText?: boolean;
}

function Cell({
  children,
  grow = 1,
  basis,
  trimText = false,
}: InterfaceDataListCell): JSX.Element {
  const mainClass = classNames("nimbus--data-table__cell", {
    "nimbus--data-table__cell--trim-text": trimText,
  });
  const divStyle = {
    flexGrow: grow,
    flexBasis: basis,
  };

  return (
    <div className={mainClass} style={divStyle}>
      {children}
    </div>
  );
}

export default Cell;
