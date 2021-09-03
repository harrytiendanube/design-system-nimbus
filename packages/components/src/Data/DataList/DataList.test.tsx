import * as React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DataList, Text, useBulkAction } from "../..";

const rows = [
  {
    id: "1",
    order: "10",
    date: "01/01/2021",
  },
  {
    id: "2",
    order: "20",
    date: "02/01/2021",
  },
  {
    id: "3",
    order: "30",
    date: "03/01/2021",
  },
];

const placeholder = "Select an Option";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
];

const getLabel = (n: number) => `${n} ${n > 1 ? "selected's" : "selected"}`;

const mockOnSelectAction = jest.fn();
const mockOnClick = jest.fn();

const { Row, Cell } = DataList;

const TableContent = () => (
  <>
    {rows.map((row) => (
      <Row id={row.id} key={row.id} onClick={mockOnClick}>
        <Cell width={60}>
          <Text>{row.order}</Text>
        </Cell>
        <Cell width={40}>
          <Text>{row.date}</Text>
        </Cell>
      </Row>
    ))}
  </>
);

const DataListWithActions = () => {
  const rowsId = rows.map((row) => row.id);
  const [editMode, setEditMode] = React.useState(false);
  const onEditMode = () => {
    setEditMode(true);
  };
  const { bulkAction, selectedRowsId, handleOnSelectRow } = useBulkAction({
    rowsId,
    placeholder,
    getLabel,
    options,
    onSelectAction: mockOnSelectAction,
  });
  return (
    <DataList
      bulkAction={bulkAction}
      selectedRowsId={selectedRowsId}
      onSelectRow={handleOnSelectRow}
      editMode={editMode}
      onEditMode={onEditMode}
    >
      <TableContent />
    </DataList>
  );
};

describe("<DataList />", () => {
  it("renders without bulk actions", () => {
    render(
      <DataList>
        <TableContent />
      </DataList>,
    );

    rows.forEach((row) => {
      expect(screen.getByText(row.order)).toBeInTheDocument();
      expect(screen.getByText(row.date)).toBeInTheDocument();
    });
  });

  it("renders with bulk actions", () => {
    render(<DataListWithActions />);

    rows.forEach((row) => {
      expect(screen.getByText(row.order)).toBeInTheDocument();
      expect(screen.getByText(row.date)).toBeInTheDocument();
    });

    expect(screen.queryAllByRole("checkbox").length).toBe(0);

    // click on a Row
    expect(mockOnClick).toBeCalledTimes(0);
    userEvent.click(screen.getByText(rows[0].order));
    expect(mockOnClick).toBeCalledTimes(1);

    // Enable edit mode by a long press action on first row
    jest.useFakeTimers();
    const cellElement = screen.getByText(rows[0].order);
    fireEvent.touchStart(cellElement);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    fireEvent.touchEnd(cellElement);

    expect(screen.getAllByRole("checkbox").length).toBe(1 + rows.length); // 1 (check select/unSelect all) + count of rows

    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[0]).toHaveClass("indeterminate");

    // Select second row
    userEvent.click(screen.getAllByRole("checkbox")[2]);
    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[0]).toHaveClass("indeterminate");
    // Select third row
    userEvent.click(screen.getAllByRole("checkbox")[3]);
    expect(screen.getAllByRole("checkbox")[0]).toBeChecked();
    expect(screen.getAllByRole("checkbox")[0]).not.toHaveClass("indeterminate");

    // Un Select first row
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[0]).toHaveClass("indeterminate");

    // Un Select second row
    userEvent.click(screen.getAllByRole("checkbox")[2]);
    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[0]).toHaveClass("indeterminate");

    // Un Select third row
    userEvent.click(screen.getAllByRole("checkbox")[3]);
    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[0]).not.toHaveClass("indeterminate");

    // Select all from un indeterminate state
    userEvent.click(screen.getAllByRole("checkbox")[0]); // First click on a row to show action header
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getAllByRole("checkbox")[1]).toBeChecked();
    expect(screen.getAllByRole("checkbox")[2]).toBeChecked();
    expect(screen.getAllByRole("checkbox")[3]).toBeChecked();

    // Un Select all
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[1]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[2]).not.toBeChecked();

    // Select action from un indeterminate state
    userEvent.click(screen.getByText(rows[0].order));
    expect(screen.getAllByRole("checkbox")[0]).toHaveClass("indeterminate");
    expect(mockOnSelectAction).toBeCalledTimes(0);
    userEvent.selectOptions(screen.getByRole("combobox"), [options[0].value]);
    expect(mockOnSelectAction).toBeCalledTimes(1);
  });
});
