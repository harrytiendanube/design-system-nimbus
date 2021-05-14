import * as React from "react";
import classNames from "classnames";

import "./DataList.css";

import Row from "./Row";
import Cell from "./Cell";

import { InterfaceBulkAction } from "../common/interfaces";
import HeaderBulkAction from "./HeaderBulkAction";

interface InterfaceDataListContext {
  /** Renders checkbox's for each row */
  editMode?: boolean;
  /** It renders checkbox's as skeletons */
  skeleton?: boolean;
  /** Event that will be triggered when a row is long pressed */
  onEditMode?: () => void;
}

export { InterfaceDataListRow } from "./Row";

export interface InterfaceDataList extends InterfaceDataListContext {
  /** React node of type children */
  children?: React.ReactNode;
  /** Rows separated by lines */
  ruled?: boolean;
  /** Defines spacing between rows */
  spacing?: "base" | "tight";
  /** Bulk action data */
  bulkAction?: InterfaceBulkAction;
}

const DataListContext = React.createContext<InterfaceDataListContext>({});

export function useDataList(): InterfaceDataListContext {
  return React.useContext(DataListContext);
}

function DataList({
  children,
  ruled = true,
  editMode,
  spacing = "base",
  skeleton = false,
  bulkAction,
  onEditMode,
}: InterfaceDataList): JSX.Element {
  const className = classNames(
    "nimbus--data-list-wrapper",
    { "nimbus--data-list-wrapper--ruled": ruled },
    { "nimbus--data-list-wrapper--actions": bulkAction && editMode },
    { "nimbus--data-list-wrapper--edit-mode": editMode },
    `nimbus--data-list-wrapper--spacing-${spacing}`,
  );

  return (
    <DataListContext.Provider
      value={{
        editMode,
        skeleton,
        onEditMode,
      }}
    >
      <div className={className}>
        {bulkAction && <HeaderBulkAction bulkAction={bulkAction} />}
        <div className="nimbus--data-list">
          <div className="nimbus--data-list__body">{children}</div>
        </div>
      </div>
    </DataListContext.Provider>
  );
}

DataList.Row = Row;
DataList.Cell = Cell;

export default DataList;
