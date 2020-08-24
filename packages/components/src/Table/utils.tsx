import { InterfaceTableRow, idRowTableType } from "../common/interfaces";

const createSelectedValues = (
  rows: InterfaceTableRow[],
  value: boolean,
): { [k: string]: boolean } => {
  const values: { [k: string]: boolean } = {};
  rows.forEach((row: InterfaceTableRow) => {
    values[row.id] = value;
  });
  return values;
};

const quantitySelected = (selected: { [k: string]: boolean }): number => {
  let rowsSelected = 0;
  Object.keys(selected).forEach((key) => {
    if (selected[key]) rowsSelected++;
  });
  return rowsSelected;
};

const isNoneSelected = (selected: { [k: string]: boolean }): boolean => {
  return quantitySelected(selected) === 0;
};

const isAllSelected = (selected: { [k: string]: boolean }): boolean => {
  return quantitySelected(selected) === Object.keys(selected).length;
};

const getNewMassActionCheckValue = (selected: {
  [k: string]: boolean;
}): boolean | "indeterminate" => {
  if (isAllSelected(selected)) {
    return true;
  }
  if (isNoneSelected(selected)) {
    return false;
  }
  return "indeterminate";
};

const getRowsId = (
  selected: { [k: string]: boolean },
  typeOfId: string,
): idRowTableType[] => {
  const rowsId: idRowTableType[] = [];
  Object.keys(selected).forEach((key) => {
    if (selected[key])
      rowsId.push(typeOfId === "number" ? parseInt(key, 10) : key);
  });
  return rowsId;
};

export {
  createSelectedValues,
  quantitySelected,
  getNewMassActionCheckValue,
  getRowsId,
};
