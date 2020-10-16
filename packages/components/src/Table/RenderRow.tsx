import * as React from "react";

import classNames from "classnames";

import { RowContext } from "./RowContext";
import Checkbox from "../Checkbox";

import {
  InterfaceMassAction,
  InterfaceNameChecked,
} from "../common/interfaces";

interface interfaceRenderRow {
  skeleton: boolean;
  editMode?: boolean;
  massAction?: InterfaceMassAction;
  index: number;
  rowsState: boolean[];
  children: React.ReactNode;
  onChangeRow: (event: InterfaceNameChecked) => void;
  onEditMode?: (event: InterfaceNameChecked) => void;
}

const RenderRow = ({
  skeleton,
  editMode,
  massAction,
  index,
  rowsState,
  children,
  onChangeRow,
  onEditMode,
}: interfaceRenderRow): JSX.Element => {
  const { rowProps } = React.useContext(RowContext);
  const [isTouching, setTouching] = React.useState(false);
  const time = React.useRef<number>();
  const className = classNames("nimbus--table-row", {
    "nimbus--table-row--grayed": rowProps.grayed,
    "nimbus--table-row--touching": isTouching,
  });

  const handleTouchStart = () => {
    if (massAction) {
      setTouching(true);
      time.current = window.setTimeout(() => {
        if ("vibrate" in navigator) {
          navigator.vibrate(10);
        }
        onEditMode?.({ name: `${index}`, checked: !rowsState[index] });
      }, 500);
    }
  };

  const handleCancelTouch = () => {
    clearTimeout(time.current);
    setTouching(false);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    rowProps.onClick?.();
  };

  return (
    <tr
      onTouchStart={handleTouchStart}
      onTouchEnd={handleCancelTouch}
      onTouchMove={handleCancelTouch}
      onTouchCancel={handleCancelTouch}
      onClick={handleClick}
      className={className}
    >
      {massAction && editMode && (
        <td className="nimbus--table-row__check">
          {skeleton ? (
            <Checkbox.Skeleton />
          ) : (
            <Checkbox
              name={`${index}`}
              checked={rowsState[index]}
              onChange={onChangeRow}
            />
          )}
        </td>
      )}
      {children}
    </tr>
  );
};

export default RenderRow;
