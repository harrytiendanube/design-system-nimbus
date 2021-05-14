import classNames from "classnames";
import * as React from "react";

import Checkbox from "../Checkbox";
import { useDataList } from "..";

export interface InterfaceDataListRow {
  /** Id of row */
  id: string;
  /** React node of type children */
  children?: React.ReactNode;
  /** Status of Checkbox of row */
  active?: boolean;
  /** Adds a light gray background to the row */
  grayed?: boolean;
  /** Callback to be called when a row is clicked */
  onClick?: (id: string) => void;
  /** Callback to be called when a checkbox of row is clicked */
  onChange?: (id: string) => void;
}

function Row({
  id,
  children,
  active = false,
  grayed,
  onClick,
  onChange,
}: InterfaceDataListRow): JSX.Element {
  const [isTouching, setTouching] = React.useState(false);

  const { editMode, skeleton, onEditMode } = useDataList();

  const classNameRow = classNames("nimbus--data-list-row", {
    "nimbus--data-list-row--grayed": grayed,
    "nimbus--data-list-row--touching": isTouching,
  });

  const classNameRowCheck = classNames(
    "nimbus--data-list-row__item nimbus--data-list-row__check-wrapper",
    {
      "is--visible": editMode,
    },
  );

  const time = React.useRef<number>();

  const handleTouchStart = () => {
    if (onChange) {
      setTouching(true);
      time.current = window.setTimeout(() => {
        setTouching(false);
        if (!editMode) {
          onEditMode?.();
        }
        onChange?.(id);
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
    if (editMode) {
      // Select / UnSelect row when edit mode
      onChange?.(id);
    } else {
      // Calls onClick row when not edit mode
      onClick?.(id);
    }
  };

  const handleChange = () => {
    onChange?.(id);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleCancelTouch}
      onTouchMove={handleCancelTouch}
      onTouchCancel={handleCancelTouch}
      onClick={handleClick}
      className={classNameRow}
    >
      {onChange && editMode && (
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
