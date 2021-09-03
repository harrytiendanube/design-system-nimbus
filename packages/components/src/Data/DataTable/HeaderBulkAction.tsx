import * as React from "react";
import { Checkbox, Select } from "../..";

import {
  InterfaceBulkAction,
  InterfaceNameChecked,
} from "../../common/interfaces";
import { useDataContext } from "../DataContext";

interface InterfaceHeaderBulkAction {
  bulkAction: InterfaceBulkAction;
}

function HeaderBulkAction({
  bulkAction,
}: InterfaceHeaderBulkAction): JSX.Element | null {
  const {
    checked,
    onSelectAll,
    placeholder,
    options,
    getLabel,
    onSelectAction,
  } = bulkAction;

  const { selectedRowsId } = useDataContext();

  const renderBulkAction = bulkAction
    ? bulkAction.checked === "indeterminate" || bulkAction.checked === true
    : false;

  if (!renderBulkAction) {
    return null;
  }
  const handleSelected = (event: InterfaceNameChecked) => {
    onSelectAll?.(event.checked);
  };
  return (
    <div className="nimbus--data-table__bulk-actions">
      <div className="nimbus--data-table__bulk-actions__check">
        <Checkbox
          name="all"
          checked={checked}
          onChange={handleSelected}
          label={getLabel(selectedRowsId?.length || 0)}
        />
      </div>
      <div className="nimbus--data-table__bulk-actions__select">
        <Select
          name="select-bulk-action"
          placeholder={placeholder}
          options={options}
          onChange={(event) => onSelectAction(event.value)}
        />
      </div>
    </div>
  );
}

export default HeaderBulkAction;
