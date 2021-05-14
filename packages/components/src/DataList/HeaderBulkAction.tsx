import * as React from "react";
import { Checkbox, Select } from "..";

import {
  InterfaceBulkAction,
  InterfaceNameChecked,
} from "../common/interfaces";

interface InterfaceHeaderBulkAction {
  bulkAction: InterfaceBulkAction;
}

function HeaderBulkAction({
  bulkAction,
}: InterfaceHeaderBulkAction): JSX.Element {
  const {
    checked,
    onSelectAll,
    placeholder,
    options,
    label,
    onChange,
    valueSelected,
  } = bulkAction as InterfaceBulkAction;

  const renderBulkAction = bulkAction
    ? bulkAction.checked === "indeterminate" || bulkAction.checked === true
    : false;

  const handleSelected = (event: InterfaceNameChecked) => {
    onSelectAll?.(event.checked);
  };

  return (
    <>
      {renderBulkAction && (
        <div className="nimbus--data-list__mass-actions">
          <div className="nimbus--data-list-row__mass-check">
            <Checkbox
              name="all"
              checked={checked}
              onChange={handleSelected}
              label={label}
            />
          </div>
          <div className="nimbus--data-list__mass-select">
            <Select
              name="select-mass-action"
              placeholder={placeholder}
              options={options}
              value={valueSelected}
              onChange={(event) => onChange(event.value)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderBulkAction;
