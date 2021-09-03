import * as React from "react";
import classNames from "classnames";

import "./DataTable.css";

import Row from "./Row";
import Cell from "./Cell";
import Header from "./Header";
import Footer from "./Footer";

import HeaderBulkAction from "./HeaderBulkAction";
import { DataContextProvider, InterfaceDataContext } from "../DataContext";

export { InterfaceDataTableRow } from "./Row";

export interface InterfaceDataTable
  extends Omit<InterfaceDataContext, "editMode" | "onEditMode"> {
  /** React node of type children */
  children?: React.ReactNode;
}

function DataTable({
  children,
  skeleton = false,
  bulkAction,
  selectedRowsId,
  onSelectRow,
}: InterfaceDataTable): JSX.Element {
  const className = classNames("nimbus--data-table");
  return (
    <DataContextProvider
      skeleton={skeleton}
      bulkAction={bulkAction}
      selectedRowsId={selectedRowsId}
      onSelectRow={onSelectRow}
    >
      <div className={className}>
        {bulkAction && <HeaderBulkAction bulkAction={bulkAction} />}
        {children}
      </div>
    </DataContextProvider>
  );
}

DataTable.Header = Header;
DataTable.Row = Row;
DataTable.Cell = Cell;
DataTable.Footer = Footer;

export default DataTable;
