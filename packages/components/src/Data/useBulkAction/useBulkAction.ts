import {
  InterfaceBulkAction,
  InterfaceSelectOption,
} from "../../common/interfaces";

export interface InterfaceUseBulkAction {
  rowsId: string[];
  selectedRowsId: string[];
  setSelectedRowsId: (rowsId: string[]) => void;
  placeholder: string;
  getLabel: (count: number) => string;
  options: InterfaceSelectOption[];
  onSelectAction: (value: string) => void;
}

export interface InterfaceUseBulkActionResult {
  bulkAction: InterfaceBulkAction;
  handleOnSelectRow: (id: string) => void;
}

function useBulkAction({
  rowsId,
  selectedRowsId,
  setSelectedRowsId,
  placeholder,
  getLabel,
  options,
  onSelectAction,
}: InterfaceUseBulkAction): InterfaceUseBulkActionResult {
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

  return { bulkAction, handleOnSelectRow };
}

export default useBulkAction;
