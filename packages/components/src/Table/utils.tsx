const createSelectedValues = (length: number, value: boolean): boolean[] => {
  const values: boolean[] = [];
  for (let i = 0; i < length; i++) {
    values[i] = value;
  }
  return values;
};

const quantitySelected = (rows: boolean[]): number => {
  let rowsSelected = 0;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i]) rowsSelected++;
  }
  return rowsSelected;
};

const isNoneSelected = (rows: boolean[]): boolean => {
  return quantitySelected(rows) === 0;
};

const isAllSelected = (rows: boolean[]): boolean => {
  return quantitySelected(rows) === rows.length;
};

const getNewMassActionCheckValue = (
  rows: boolean[],
): boolean | "indeterminate" => {
  if (isAllSelected(rows)) {
    return true;
  }
  if (isNoneSelected(rows)) {
    return false;
  }
  return "indeterminate";
};

const getRowsId = (rows: boolean[]): number[] => {
  const rowsId = [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i]) rowsId.push(i);
  }
  return rowsId;
};

export {
  createSelectedValues,
  quantitySelected,
  getNewMassActionCheckValue,
  getRowsId,
};
