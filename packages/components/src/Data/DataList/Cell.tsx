import * as React from "react";
import classNames from "classnames";

export interface InterfaceDataListCell {
  /** React node of type children */
  children?: React.ReactNode;
  /** Defines the width of the cell for mobile in % */
  width?: number | "fill" | "auto";
  /** Defines the alignment of the cell for mobile */
  alignRight?: boolean;
  /** Defines whether the cell is the title of the row */
  rowTitle?: boolean;
  /** Adds extra padding to the top */
  extraPadding?: boolean;
  /** Allows for long text to be trimmed */
  trimText?: boolean;
}

function Cell({
  children,
  width = 50,
  alignRight = false,
  extraPadding = false,
  trimText = false,
  rowTitle = false,
}: InterfaceDataListCell): JSX.Element {
  const mainClass = classNames(
    "nimbus--data-list-row__item",
    `nimbus--data-list-row__item--${width}-width`,
    { "nimbus--data-list-row__item--align-right": alignRight },
    { "nimbus--data-list-row__item--extra-padding": extraPadding },
    { "nimbus--data-list-row__item--trim-text": trimText },
    { "nimbus--data-list-row__item--row-title": rowTitle },
  );

  return <div className={mainClass}>{children}</div>;
}

export default Cell;
