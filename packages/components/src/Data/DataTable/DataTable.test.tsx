import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DataTable, Text, useBulkAction } from "../..";

const headers = ["Order", "Date"];

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

const footer = "Footer Text";

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

const { Row, Cell, Header, Footer } = DataTable;

const TableContent = () => (
  <>
    <Header>
      <Cell>
        <Text>{headers[0]}</Text>
      </Cell>
      <Cell>
        <Text>{headers[1]}</Text>
      </Cell>
    </Header>
    {rows.map((row) => (
      <Row id={row.id} key={row.id} onClick={mockOnClick}>
        <Cell>
          <Text>{row.order}</Text>
        </Cell>
        <Cell>
          <Text>{row.date}</Text>
        </Cell>
      </Row>
    ))}
    <Footer>
      <Text>{footer}</Text>
    </Footer>
  </>
);

const DataTableWithActions = () => {
  const rowsId = rows.map((row) => row.id);
  const [selectedRowsId, setSelectedRowsId] = React.useState<string[]>([]);
  const { bulkAction, handleOnSelectRow } = useBulkAction({
    rowsId,
    selectedRowsId,
    setSelectedRowsId,
    placeholder,
    getLabel,
    options,
    onSelectAction: mockOnSelectAction,
  });
  return (
    <DataTable
      bulkAction={bulkAction}
      selectedRowsId={selectedRowsId}
      onSelectRow={handleOnSelectRow}
    >
      <TableContent />
    </DataTable>
  );
};

describe("<DataTable />", () => {
  it("renders without bulk actions", () => {
    render(
      <DataTable>
        <TableContent />
      </DataTable>,
    );
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
    rows.forEach((row) => {
      expect(screen.getByText(row.order)).toBeInTheDocument();
      expect(screen.getByText(row.date)).toBeInTheDocument();
    });
    expect(screen.getByText(footer)).toBeInTheDocument();
  });

  it("renders with bulk actions", () => {
    render(<DataTableWithActions />);

    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
    rows.forEach((row) => {
      expect(screen.getByText(row.order)).toBeInTheDocument();
      expect(screen.getByText(row.date)).toBeInTheDocument();
    });
    expect(screen.getByText(footer)).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox").length).toBe(1 + rows.length); // 1 (check select/unSelect all) + count of rows

    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[0]).not.toHaveClass("indeterminate");
    // Select first row
    userEvent.click(screen.getAllByRole("checkbox")[1]);
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

    // Select all on Header
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getAllByRole("checkbox")[1]).toBeChecked();
    expect(screen.getAllByRole("checkbox")[2]).toBeChecked();
    expect(screen.getAllByRole("checkbox")[3]).toBeChecked();

    // Un Select all on Header
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getAllByRole("checkbox")[1]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[2]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[3]).not.toBeChecked();

    // Select all from un indeterminate state
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    expect(screen.getAllByRole("checkbox")[0]).toHaveClass("indeterminate");
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getAllByRole("checkbox")[1]).toBeChecked();
    expect(screen.getAllByRole("checkbox")[2]).toBeChecked();
    expect(screen.getAllByRole("checkbox")[3]).toBeChecked();

    // Select action from un indeterminate state
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    expect(screen.getAllByRole("checkbox")[0]).toHaveClass("indeterminate");
    expect(mockOnSelectAction).toBeCalledTimes(0);
    userEvent.selectOptions(screen.getByRole("combobox"), [options[0].value]);
    expect(mockOnSelectAction).toBeCalledTimes(1);

    // click on a Row
    expect(mockOnClick).toBeCalledTimes(0);
    userEvent.click(screen.getByText(rows[0].order));
    expect(mockOnClick).toBeCalledTimes(1);
  });
});
