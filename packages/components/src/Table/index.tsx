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
  /** Renders checkbox's for each row */
  editMode?: boolean;
  /** Defines spacing between rows */
  spacing?: "base" | "tight";
  /** React node of type children */
  children?: React.ReactNode;
  /** It renders checkbox's as skeletons */
  skeleton?: boolean;
  /** It shows a loading spinner at the end of the table */
  loading?: boolean;
  /**
   * Bottom margin to consider when calling onEndScroll. It is expressed in
   * relative units to window.innerHeight
   */
  marginEndScroll?: number;
  /** Event that will be triggered when a row is long pressed */
  onEditMode?: () => void;
  /**
   * Event that will be triggered when scroll view intersect with end to the
   * table
   */
  onEndScroll?: () => void;
}

/**
 * @param headers Headers of the table
 * @param rows Text to be displayed in the alert
 * @param massAction Mass Action data
 * @param ruled Rows separated by lines
 * @param editMode Renders checkbox's for each row
 * @param spacing Defines spacing between rows
 * @param skeleton It renders checkbox's as skeletons
 * @param loading It shows a loading spinner at the end of the table
 * @param marginEndScroll Bottom margin to consider when calling onEndScroll. It
 *     is expressed in relative units to window.innerHeight
 * @param onEditMode Event that will be triggered when a row is long pressed
 * @param onEndScroll Event that will be triggered when scroll view intersect
 *     with end to the table
 */
const Table = React.memo(function Table({
  headers,
  children,
  massAction,
  ruled = true,
  editMode,
  spacing = "base",
  skeleton = false,
  loading = false,
  marginEndScroll = 1,
  onEditMode,
  onEndScroll,
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

  const [massActionCheckValue, setMassActionCheckValue] = React.useState<
    boolean | "indeterminate"
  >(false);

  const handleChangeRow = React.useCallback(
    (event: InterfaceNameChecked) => {
      const newSelected = [...rowsState];
      newSelected[parseInt(event.name, 10)] = event.checked;
      setRowsState(newSelected);
      setMassActionCheckValue(getNewMassActionCheckValue(newSelected));
    },
    [rowsState],
  );

  const handleOnChangeSelectMassAction = React.useCallback(
    (event: InterfaceNameValue) => {
      (massAction as InterfaceMassAction).onChange({
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
              label={(massAction as InterfaceMassAction).getLabel(
                quantitySelected(rowsState),
              )}
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
                {skeleton ? (
                  <Checkbox name="check-all" disabled />
                ) : (
                  <Checkbox
                    name="check-all"
                    checked={massActionCheckValue}
                    onChange={handleOnChangeCheckMassAction}
                  />
                )}
              </th>
            )}
            {(headers as string[]).map((header) => (
              <th scope="col" key={header} className="nimbus--table-row__item">
                <Text>{header}</Text>
              </th>
            ))}
          </tr>
        </thead>
      ),
    [
      handleOnChangeCheckMassAction,
      headers,
      massAction,
      massActionCheckValue,
      skeleton,
    ],
  );

  React.useEffect(() => {
    const margin = Math.trunc(window.innerHeight * marginEndScroll);
    const options = {
      rootMargin: `0px 0px ${margin}px 0px`,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        onEndScroll?.();
        observer.disconnect();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(document.querySelector("#end") as Element);

    const newRowState = [
      ...rowsState,
      ...createSelectedValues(
        React.Children.count(children) - rowsState.length,
        false,
      ),
    ];

    setRowsState(newRowState);
    setMassActionCheckValue(getNewMassActionCheckValue(newRowState));

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  const className = React.useMemo(
    () =>
      classNames(
        "nimbus--table-wrapper",
        { "nimbus--table-wrapper--ruled": ruled },
        { "nimbus--table-wrapper--actions": massAction && editMode },
        { "nimbus--table-wrapper--edit-mode": editMode },
        `nimbus--table-wrapper--spacing-${spacing}`,
      ),
    [editMode, massAction, ruled, spacing],
  );

  React.useEffect(() => {
    // Reset check's state when user turn off editMode
    if (!editMode) {
      setMassActionCheckValue(false);
      setRowsState(allChecksUnSelected);
    }
  }, [allChecksUnSelected, editMode]);

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
                        skeleton={skeleton}
                        editMode={editMode}
                        massAction={massAction}
                        index={index}
                        rowsState={rowsState}
                        onChangeRow={handleChangeRow}
                        onEditMode={(event) => {
                          handleChangeRow(event);
                          if (!editMode) onEditMode?.();
                        }}
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

        <div id="end" />
        {loading && (
          <div className="nimbus--spinner-wrapper">
            <div className="nimbus--spinner" />
          </div>
        )}
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
