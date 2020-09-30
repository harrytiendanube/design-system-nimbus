import * as React from "react";

import { RowContext } from "./RowContext";
import Checkbox from "../Checkbox";

import {
  InterfaceMassAction,
  InterfaceNameChecked,
} from "../common/interfaces";

interface interfaceRenderRow {
  massAction?: InterfaceMassAction;
  index: number;
  rowsState: boolean[];
  handleChangeRow: (event: InterfaceNameChecked) => void;
  children: React.ReactNode;
}

const RenderRow = ({
  massAction,
  index,
  rowsState,
  handleChangeRow,
  children,
}: interfaceRenderRow): JSX.Element => {
  const { rowProps } = React.useContext(RowContext);
  return (
    <tr
      className={`nimbus--table-row ${
        rowProps?.grayed ? "nimbus--table-row--grayed" : ""
      }`}
    >
      {massAction && (
        <td className="nimbus--table-row__check">
          <Checkbox
            name={`${index}`}
            checked={rowsState[index]}
            onChange={handleChangeRow}
          />
        </td>
      )}
      {children}
    </tr>
  );
};

export default RenderRow;