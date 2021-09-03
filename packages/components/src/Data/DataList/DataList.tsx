import * as React from "react";
import classNames from "classnames";

import "./DataList.css";

import Row from "./Row";
import Cell from "./Cell";

import HeaderBulkAction from "./HeaderBulkAction";
import { DataContextProvider, InterfaceDataContext } from "../DataContext";

export { InterfaceDataListRow } from "./Row";
export interface InterfaceDataList extends InterfaceDataContext {
  /** React node of type children */
  children?: React.ReactNode;
  /** Rows separated by lines */
  ruled?: boolean;
  /** Defines spacing between rows */
  spacing?: "base" | "tight";
}
function DataList({
  children,
  ruled = true,
  editMode,
  spacing = "base",
  skeleton = false,
  bulkAction,
  selectedRowsId,
  onEditMode,
  onSelectRow,
}: InterfaceDataList): JSX.Element {
  const className = classNames(
    "nimbus--data-list-wrapper",
    { "nimbus--data-list-wrapper--ruled": ruled },
    { "nimbus--data-list-wrapper--actions": bulkAction && editMode },
    { "nimbus--data-list-wrapper--edit-mode": editMode },
    `nimbus--data-list-wrapper--spacing-${spacing}`,
  );

  return (
    <DataContextProvider
      editMode={editMode}
      skeleton={skeleton}
      onEditMode={onEditMode}
      selectedRowsId={selectedRowsId}
      onSelectRow={onSelectRow}
    >
      <div className={className}>
        {bulkAction && <HeaderBulkAction bulkAction={bulkAction} />}
        <div className="nimbus--data-list">
          <div className="nimbus--data-list__body">{children}</div>
        </div>
      </div>
    </DataContextProvider>
  );
}

DataList.Row = Row;
DataList.Cell = Cell;

export default DataList;
