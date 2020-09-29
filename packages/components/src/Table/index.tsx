import * as React from "react";

import classNames from "classnames";

import Row from "./Table.Row";
import Item from "./Table.Item";
import RenderRow from "./RenderRow";
import RowContextProvider from "./RowContext";

import "./Table.css";

import Text from "../Text";
import Checkbox from "../Checkbox";
import Select from "../Select";

import {
  InterfaceNameChecked,
  InterfaceMassAction,
  InterfaceNameValue,
} from "../common/interfaces";

import {
  createSelectedValues,
  quantitySelected,
  getNewMassActionCheckValue,
  getRowsId,
} from "./utils";

interface InterfaceTable {
  /** Headers of the table */
  headers?: string[];
  /** Mass Action data */
  massAction?: InterfaceMassAction;
  /** Rows separated by lines */
  ruled?: boolean;
  /** Defines spacing between rows */
  spacing?: "base" | "tight";
  /** React node of type children */
  children?: React.ReactNode;
}

/**
 * @param headers Headers of the table
 * @param rows Text to be displayed in the alert
 * @param massAction Mass Action data
 * @param ruled Rows separated by lines
 * @param spacing Defines spacing between rows
 */
const Table = React.memo(function Table({
  headers,
  children,
  massAction,
  ruled = true,
  spacing = "base",
}: InterfaceTable): JSX.Element {
  const rowsCount = React.useMemo(() => React.Children.count(children), [
    children,
  ]);
  const allChecksUnSelected = React.useMemo(
    () => createSelectedValues(rowsCount, false),
    [rowsCount],
  );
  const allChecksSelected = React.useMemo(
    () => createSelectedValues(rowsCount, true),
    [rowsCount],
  );
  const [rowsState, setRowsState] = React.useState(
    createSelectedValues(rowsCount, false),
  );
  const [massActionSelectValue] = React.useState("");
  const [massActionCheckValue, setMassActionCheckValue] = React.useState(false);

  const handleChangeRow = React.useCallback(
    (event: InterfaceNameChecked) => {
      const newSelected = [...rowsState];
      newSelected[parseInt(event.name, 10)] = event.checked;
      setRowsState(newSelected);
      const setState = setMassActionCheckValue as React.Dispatch<
        React.SetStateAction<boolean | "indeterminate">
      >;
      setState(getNewMassActionCheckValue(newSelected));
    },
    [rowsState],
  );

  const handleOnChangeSelectMassAction = React.useCallback(
    (event: InterfaceNameValue) => {
      massAction?.onChange({
        value: event.value,
        indexRows: getRowsId(rowsState),
      });
      setMassActionCheckValue(false);
      setRowsState(allChecksUnSelected);
    },
    [allChecksUnSelected, massAction, rowsState],
  );
  const handleOnChangeCheckMassAction = React.useCallback(
    (event: InterfaceNameChecked) => {
      setMassActionCheckValue(event.checked);
      setRowsState(event.checked ? allChecksSelected : allChecksUnSelected);
    },
    [allChecksSelected, allChecksUnSelected],
  );

  const memorizedMassAction = React.useMemo(
    () =>
      massAction &&
      massActionCheckValue && (
        <div className="nimbus--table__mass-actions">
          <div className="nimbus--table__mass-check">
            <Checkbox
              name="check-all-mass-action"
              checked={massActionCheckValue}
              onChange={handleOnChangeCheckMassAction}
              label={massAction?.getLabel(quantitySelected(rowsState))}
            />
          </div>
          <div className="nimbus--table__mass-select">
            <Select
              name="select-mass-action"
              placeholder={massAction.placeholder}
              options={massAction.options}
              value={massActionSelectValue}
              onChange={handleOnChangeSelectMassAction}
            />
          </div>
        </div>
      ),
    [
      handleOnChangeCheckMassAction,
      handleOnChangeSelectMassAction,
      massAction,
      massActionCheckValue,
      massActionSelectValue,
      rowsState,
    ],
  );

  const memorizedHeader = React.useMemo(
    () =>
      !(massAction && massActionCheckValue) &&
      headers && (
        <thead className="nimbus--table__header">
          <tr className="nimbus--table-row">
            {massAction && (
              <th className="nimbus--table-row__check">
                <Checkbox
                  name="check-all"
                  checked={massActionCheckValue}
                  onChange={handleOnChangeCheckMassAction}
                />
              </th>
            )}
            {headers?.map((header) => (
              <th scope="col" key={header} className="nimbus--table-row__item">
                <Text>{header}</Text>
              </th>
            ))}
          </tr>
        </thead>
      ),
    [handleOnChangeCheckMassAction, headers, massAction, massActionCheckValue],
  );

  const className = React.useMemo(
    () =>
      classNames(
        "nimbus--table-wrapper",
        { "nimbus--table-wrapper--ruled": ruled },
        { "nimbus--table-wrapper--actions": massAction },
        `nimbus--table-wrapper--spacing-${spacing}`,
      ),
    [massAction, ruled, spacing],
  );

  return (
    <>
      <div className={className}>
        {memorizedMassAction}
        <table className="nimbus--table">
          {memorizedHeader}
          <tbody className="nimbus--table__body">
            {React.Children.map(children, (row, index) => {
              return (
                <>
                  {row && (
                    <RowContextProvider key={index}>
                      <RenderRow
                        massAction={massAction}
                        index={index}
                        rowsState={rowsState}
                        handleChangeRow={handleChangeRow}
                      >
                        {row}
                      </RenderRow>
                    </RowContextProvider>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}) as React.NamedExoticComponent<InterfaceTable> & {
  Item: typeof Item;
} & {
  Row: typeof Row;
};

Table.Row = Row;
Table.Item = Item;

export default Table;
