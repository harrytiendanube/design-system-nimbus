import * as React from "react";

import "./Table.css";

import Text from "../Text";
import Checkbox from "../Checkbox";
import Select from "../Select";

import {
  InterfaceTableRow,
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
  /**
   * Headers of the table
   */
  headers: string[];
  /**
   * Rows of the table
   * */
  rows: InterfaceTableRow[];
  /**
   * Column extra class
   */
  columnClass?: string[];
  /**
   * Mass Action data
   * */
  massAction?: InterfaceMassAction;
}

/**
 * @param headers  Headers of the table
 * @param rows Text to be displayed in the alert
 * @param columnClass Text to be displayed in the alert
 * @param massAction Mass Action data
 */
function Table({
  headers,
  rows,
  columnClass,
  massAction,
}: InterfaceTable): JSX.Element {
  const allChecksUnSelected = React.useMemo(
    () => createSelectedValues(rows, false),
    [rows],
  );
  const allChecksSelected = React.useMemo(
    () => createSelectedValues(rows, true),
    [rows],
  );
  const [rowsChecked, setRowsChecked] = React.useState(
    createSelectedValues(rows, false),
  );
  const [massActionSelectValue] = React.useState("");
  const [massActionCheckValue, setMassActionCheckValue] = React.useState(false);

  const handleChangeRow = React.useCallback(
    (event: InterfaceNameChecked) => {
      const newSelected = { ...rowsChecked, [event.name]: event.checked };
      setRowsChecked(newSelected);
      const setState = setMassActionCheckValue as React.Dispatch<
        React.SetStateAction<boolean | "indeterminate">
      >;
      setState(getNewMassActionCheckValue(newSelected));
    },
    [rowsChecked],
  );

  const handleOnChangeSelectMassAction = React.useCallback(
    (event: InterfaceNameValue) => {
      massAction?.onChange({
        value: event.value,
        rowsId: getRowsId(rowsChecked, typeof rows[0].id),
      });
      setMassActionCheckValue(false);
      setRowsChecked(allChecksUnSelected);
    },
    [allChecksUnSelected, massAction, rows, rowsChecked],
  );
  const handleOnChangeCheckMassAction = React.useCallback(
    (event: InterfaceNameChecked) => {
      setMassActionCheckValue(event.checked);
      setRowsChecked(event.checked ? allChecksSelected : allChecksUnSelected);
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
              label={massAction?.getLabel(quantitySelected(rowsChecked))}
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
      rowsChecked,
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
              <th scope="col" key={header} className="nimbus--table-row__item">
                <Text>{header}</Text>
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
            {rows.map((row) => (
              <tr key={row.id} className="nimbus--table-row">
                <td className="nimbus--table-row__check">
                  <Checkbox
                    name={`${row.id}`}
                    checked={rowsChecked[row.id]}
                    onChange={handleChangeRow}
                  />
                </td>
                {row.columns.map((column, index) => {
                  const className = `nimbus--table-row__item ${
                    columnClass && columnClass[index]
                  }`;
                  return (
                    <>
                      {index === 0 ? (
                        <th key={index} scope="row" className={className}>
                          {column}
                        </th>
                      ) : (
                        <td key={index} className={className}>
                          {column}
                        </td>
                      )}
                    </>
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
