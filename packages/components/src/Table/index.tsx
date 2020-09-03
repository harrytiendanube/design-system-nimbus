import * as React from "react";

import "./Table.css";

import Text from "../Text";
import Checkbox from "../Checkbox";
import Select from "../Select";

import {
  InterfaceNameChecked,
  InterfaceMassAction,
  InterfaceNameValue,
  InterfaceHeaderTable,
} from "../common/interfaces";

import {
  createSelectedValues,
  quantitySelected,
  getNewMassActionCheckValue,
  getRowsId,
} from "./utils";

interface InterfaceTable {
  /**
   * Headers of the table
   */
  headers: InterfaceHeaderTable[];
  /**
   * Rows of the table
   * */
  rows: JSX.Element[][];
  /**
   * Mass Action data
   * */
  massAction?: InterfaceMassAction;
}

/**
 * @param headers  Headers of the table
 * @param rows Text to be displayed in the alert
 * @param massAction Mass Action data
 */
function Table({ headers, rows, massAction }: InterfaceTable): JSX.Element {
  const allChecksUnSelected = React.useMemo(
    () => createSelectedValues(rows.length, false),
    [rows],
  );
  const allChecksSelected = React.useMemo(
    () => createSelectedValues(rows.length, true),
    [rows],
  );
  const [rowsState, setRowsState] = React.useState(
    createSelectedValues(rows.length, false),
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
      !(massAction && massActionCheckValue) && (
        <thead className="nimbus--table__header">
          <tr className="nimbus--table-row">
            <th className="nimbus--table-row__check">
              <Checkbox
                name="check-all"
                checked={massActionCheckValue}
                onChange={handleOnChangeCheckMassAction}
              />
            </th>
            {headers.map((header) => (
              <th
                scope="col"
                key={header.value}
                className="nimbus--table-row__item"
              >
                <Text>{header.value}</Text>
              </th>
            ))}
          </tr>
        </thead>
      ),
    [handleOnChangeCheckMassAction, headers, massAction, massActionCheckValue],
  );

  return (
    <>
      <div className="nimbus--table-wrapper">
        {memorizedMassAction}
        <table className="nimbus--table">
          {memorizedHeader}
          <tbody className="nimbus--table__body">
            {rows.map((row, index) => (
              <tr key={index} className="nimbus--table-row">
                <td className="nimbus--table-row__check">
                  <Checkbox
                    name={`${index}`}
                    checked={rowsState[index]}
                    onChange={handleChangeRow}
                  />
                </td>
                {row.map((column, indexCol) => {
                  const className = `nimbus--table-row__item ${
                    headers[indexCol].class ?? ""
                  }`;
                  return indexCol === 0 ? (
                    <th key={indexCol} scope="row" className={className}>
                      {column}
                    </th>
                  ) : (
                    <td key={indexCol} className={className}>
                      {column}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default React.memo(Table);
