import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Table, Text } from "..";
import { InterfaceMassActionSelected } from "../common/interfaces";

const handleChange = jest.fn(
  (selected: InterfaceMassActionSelected) => selected,
);

const myHeaders = [
  { value: "Order" },
  { value: "Date", class: "nimbus--table-row__item--full-width" },
];
const rows: JSX.Element[][] = [
  [<Text key="1">Text 00</Text>, <Text key="2">Text 01</Text>],
  [<Text key="1">Text 01</Text>, <Text key="2">Text 11</Text>],
];

const myMA = {
  placeholder: "Select an Option",
  options: [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
  ],
  getLabel: (n: number) => `${n} selected`,
  onChange: handleChange,
};

describe("<Table />", () => {
  it("renders", () => {
    render(<Table headers={myHeaders} rows={rows} massAction={myMA} />);
    expect(screen.getByRole("table")).toBeTruthy();
    expect(screen.getAllByRole("rowheader").length).toBe(rows.length);
    expect(screen.getAllByRole("columnheader").length).toBe(
      myHeaders.length + 1,
    );
    expect(screen.getAllByRole("rowgroup").length).toBe(2);
    expect(screen.getAllByRole("row").length).toBe(rows.length + 1);
    expect(screen.getAllByRole("cell").length).toBe(rows.length * 2);
    expect(screen.getAllByRole("checkbox").length).toBe(rows.length + 1);
    expect(screen.queryByRole("combobox")).toBeFalsy();
  });

  it("renders Massive Select Area (indeterminate) when any row is checked", () => {
    render(<Table headers={myHeaders} rows={rows} massAction={myMA} />);
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    expect(screen.queryByRole("columnheader")).toBeFalsy();
    const checkbox: HTMLElement = screen.getByRole("checkbox", {
      name: myMA.getLabel(1),
    });
    expect(checkbox).toHaveClass("nimbus--checkbox indeterminate");
    expect(checkbox).not.toBeChecked();
    expect(screen.getByRole("combobox"));
    expect(screen.getByRole("option", { name: myMA.placeholder }));
    myMA.options.forEach((option) =>
      expect(screen.getByRole("option", { name: option.label })).toHaveProperty(
        "value",
        option.value,
      ),
    );
  });

  it("renders Massive Select Area (checked) when all row is checked", () => {
    render(<Table headers={myHeaders} rows={rows} massAction={myMA} />);
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    userEvent.click(screen.getAllByRole("checkbox")[2]);
    const checkbox: HTMLElement = screen.getByRole("checkbox", {
      name: myMA.getLabel(2),
    });
    expect(checkbox).not.toHaveClass("nimbus--checkbox indeterminate");
    expect(checkbox).toBeChecked();
  });

  it("renders Massive Select Area (checked) when click on check-all", () => {
    render(<Table headers={myHeaders} rows={rows} massAction={myMA} />);
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    const checkbox: HTMLElement = screen.getByRole("checkbox", {
      name: myMA.getLabel(rows.length),
    });
    expect(checkbox).not.toHaveClass("nimbus--checkbox indeterminate");
    expect(checkbox).toBeChecked();
    // also check that all rows has been checked
    expect(screen.getAllByRole("checkbox")[1]).toBeChecked();
    expect(screen.getAllByRole("checkbox")[2]).toBeChecked();
  });

  it("calls onChange from Massive Select Area", () => {
    render(<Table headers={myHeaders} rows={rows} massAction={myMA} />);
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    const select: HTMLElement = screen.getByRole("combobox");
    const option: HTMLElement = screen.getByRole("option", {
      name: myMA.options[0].label,
    });
    userEvent.selectOptions(select, [option]);
    expect(handleChange).toHaveBeenCalledWith({
      value: myMA.options[0].value,
      indexRows: [0],
    });
  });

  it("unChecks all rows", () => {
    render(<Table headers={myHeaders} rows={rows} massAction={myMA} />);
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getAllByRole("checkbox")[1]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[2]).not.toBeChecked();
  });

  it("hides Massive Select Area when no rows are selected", () => {
    render(<Table headers={myHeaders} rows={rows} massAction={myMA} />);
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    expect(screen.queryByRole("combobox")).toBeFalsy();
    expect(screen.getAllByRole("columnheader")).toBeTruthy();
  });
});
