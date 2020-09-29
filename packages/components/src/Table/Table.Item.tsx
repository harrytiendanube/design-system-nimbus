import * as React from "react";
import classNames from "classnames";

export interface InterfaceTableCell {
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

/**
 * @param children React node of type children
 * @param width Defines the width of the cell for mobile in %
 * @param alignRight Defines the alignment of the cell for mobile
 * @param rowTitle Defines whether the cell is the title of the row
 * @param extraPadding Adds extra padding to the top
 * @param trimText Allows for long text to be trimmed
 */
function Item({
  children,
  width = 50,
  alignRight = false,
  rowTitle = false,
  extraPadding = false,
  trimText = false,
}: InterfaceTableCell): JSX.Element {
  const mainClass = React.useMemo(
    () =>
      classNames(
        "nimbus--table-row__item",
        `nimbus--table-row__item--${width}-width`,
        { "nimbus--table-row__item--align-right": alignRight },
        { "nimbus--table-row__item--extra-padding": extraPadding },
        { "nimbus--table-row__item--trim-text": trimText },
      ),
    [alignRight, extraPadding, trimText, width],
  );
  return rowTitle ? (
    <th scope="row" className={mainClass}>
      {children}
    </th>
  ) : (
    <td className={mainClass}>{children}</td>
  );
}

export default React.memo(Item);
