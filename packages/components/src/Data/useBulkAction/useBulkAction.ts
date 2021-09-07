import * as React from "react";

import {
  InterfaceBulkAction,
  InterfaceSelectOption,
} from "../../common/interfaces";

export interface InterfaceUseBulkAction {
  rowsId: string[];
  placeholder: string;
  getLabel: (count: number) => string;
  options: InterfaceSelectOption[];
  onSelectAction: (value: string) => void;
}

export interface InterfaceUseBulkActionResult {
  bulkAction: InterfaceBulkAction;
  selectedRowsId: string[];
  handleOnSelectRow: (id: string) => void;
}

function useBulkAction({
  rowsId,
  placeholder,
  getLabel,
  options,
  onSelectAction,
}: InterfaceUseBulkAction): InterfaceUseBulkActionResult {
  const initialSelectedIdRows: string[] = [];
  const [selectedRowsId, setSelectedRowsId] = React.useState(
    initialSelectedIdRows,
  );
  const handleSelectAll = (all: boolean) => {
    if (all) {
      setSelectedRowsId([...rowsId]);
    }
    if (!all) {
      setSelectedRowsId([]);
    }
  };
  const handleOnSelectRow = (id: string) => {
    if (selectedRowsId.includes(id)) {
      const newSelectedRows = selectedRowsId.filter((rowId) => rowId !== id);
      setSelectedRowsId(newSelectedRows);
      return;
    }
    setSelectedRowsId([...selectedRowsId, id]);
  };
  const checkedLength = selectedRowsId.length;
  const trueOrIndeterminate =
    checkedLength === rowsId.length ? true : "indeterminate";
  const checked = checkedLength === 0 ? false : trueOrIndeterminate;
  const bulkAction: InterfaceBulkAction = {
    checked,
    placeholder,
    getLabel,
    onSelectAll: handleSelectAll,
    options,
    onSelectAction,
  };

  return { bulkAction, selectedRowsId, handleOnSelectRow };
}

export default useBulkAction;
