import classNames from "classnames";
import * as React from "react";

import Checkbox from "../../Checkbox";
import { useDataContext } from "../DataContext";

export interface InterfaceDataTableRow {
  /** Id of row */
  id: string;
  /** React node of type children */
  children?: React.ReactNode;
  /** Callback to be called when a row is clicked */
  onClick?: (id: string) => void;
  /** Defines the alignment of the elements as in a flex container */
  align?: "flex-start" | "center" | "flex-end";
}

function Row({
  id,
  children,
  onClick,
  align = "flex-start",
}: InterfaceDataTableRow): JSX.Element {
  const {
    skeleton,
    bulkAction,
    selectedRowsId,
    onSelectRow,
  } = useDataContext();

  const active = selectedRowsId?.includes(id);

  const classNameRow = classNames("nimbus--data-table__row", {
    "nimbus--data-table__row--active": active,
  });

  const classNameRowCheck = classNames(
    "nimbus--data-table__cell-checkbox is--visible",
  );

  const handleClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onClick?.(id);
  };

  const handleChange = () => {
    onSelectRow?.(id);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={handleClick}
      className={classNameRow}
      style={{ alignItems: align }}
    >
      {onSelectRow && bulkAction && (
        <div className={classNameRowCheck}>
          {skeleton ? (
            <Checkbox name={id} disabled />
          ) : (
            <Checkbox name={id} checked={active} onChange={handleChange} />
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export default Row;
