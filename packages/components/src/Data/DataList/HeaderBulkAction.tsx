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

  const handleSelected = (event: InterfaceNameChecked) => {
    onSelectAll?.(event.checked);
  };

  if (!renderBulkAction) {
    return null;
  }

  return (
    <div className="nimbus--data-list__mass-actions">
      <div className="nimbus--data-list-row__mass-check">
        <Checkbox
          name="all"
          checked={checked}
          onChange={handleSelected}
          label={getLabel(selectedRowsId?.length || 0)}
        />
      </div>
      <div className="nimbus--data-list__mass-select">
        <Select
          name="select-mass-action"
          placeholder={placeholder}
          options={options}
          onChange={(event) => onSelectAction(event.value)}
        />
      </div>
    </div>
  );
}

export default HeaderBulkAction;
