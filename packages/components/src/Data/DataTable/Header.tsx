import classNames from "classnames";
import * as React from "react";

import Checkbox from "../../Checkbox";
import { useDataContext } from "../DataContext";

export interface InterfaceDataTableHeader {
  /** React node of type children */
  children?: React.ReactNode;
}

function Header({ children }: InterfaceDataTableHeader): JSX.Element | null {
  const { bulkAction, selectedRowsId = [] } = useDataContext();

  if (selectedRowsId.length > 0) return null;

  const className = classNames("nimbus--data-table__header");

  const handleOnChange = () => {
    bulkAction?.onSelectAll(true);
  };

  return (
    <div className={className}>
      {bulkAction && (
        <div className="nimbus--data-table__cell-checkbox is--visible">
          <Checkbox name="check" onChange={handleOnChange} />
        </div>
      )}
      {children}
    </div>
  );
}

export default Header;
