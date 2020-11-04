import * as React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockIsIntersecting } from "../common/test-utils";
import { Table, Text } from "..";
import { InterfaceMassActionSelected } from "../common/interfaces";

const handleChange = jest.fn(
  (selected: InterfaceMassActionSelected) => selected,
);

const handleClick = jest.fn();

const myHeaders = ["Order", "Date"];
const myRuled = true;
const mySpacing = "base";
const myMarginEndScroll = 1;
const myEditMode = true;
const myTexts = [
  ["Text 00", "Text 01"],
  ["Text 10", "Text 11"],
];
const myMassAction = {
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
const rows: React.ReactNode = [
  [
    <Table.Row key="0" onClick={handleClick}>
      <Table.Item rowTitle>
        <Text>{myTexts[0][0]}</Text>
      </Table.Item>
      <Table.Item>
        <Text>{myTexts[0][1]}</Text>
      </Table.Item>
    </Table.Row>,
  ],
  [
    <Table.Row key="1" grayed>
      <Table.Item rowTitle width={60}>
        <Text>{myTexts[1][0]}</Text>
      </Table.Item>
      <Table.Item width={40} alignRight extraPadding trimText>
        <Text>{myTexts[1][1]}</Text>
      </Table.Item>
    </Table.Row>,
  ],
];

describe("<Table />", () => {
  it("renders", () => {
    render(
      <Table
        headers={myHeaders}
        massAction={myMassAction}
        editMode={myEditMode}
        ruled={myRuled}
        spacing={mySpacing}
      >
        {rows}
      </Table>,
    );
    const rowsCount = React.Children.count(rows);
    expect(screen.getByRole("table")).toBeTruthy();
    expect(screen.getAllByRole("rowheader").length).toBe(rowsCount);
    expect(screen.getAllByRole("columnheader").length).toBe(
      myHeaders.length + 1,
    );
    expect(screen.getAllByRole("rowgroup").length).toBe(2);
    expect(screen.getAllByRole("row").length).toBe(rowsCount + 1);
    expect(screen.getAllByRole("cell").length).toBe(rowsCount * 2);
    expect(screen.getAllByRole("checkbox").length).toBe(rowsCount + 1);
    expect(screen.queryByRole("combobox")).toBeFalsy();
  });

  it("renders checkbox's as skeletons", () => {
    const { container } = render(
      <Table
        headers={myHeaders}
        massAction={myMassAction}
        editMode={myEditMode}
        skeleton
      >
        {rows}
      </Table>,
    );
    const rowsCount = React.Children.count(rows);
    expect(
      container.querySelectorAll(".nimbus--checkbox-skeleton"),
    ).toHaveLength(rowsCount + 1);
  });

  it("renders Massive Select Area (indeterminate) when any row is checked", () => {
    render(
      <Table
        headers={myHeaders}
        massAction={myMassAction}
        editMode={myEditMode}
      >
        {rows}
      </Table>,
    );
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    expect(screen.queryByRole("columnheader")).toBeFalsy();
    const checkbox: HTMLElement = screen.getByRole("checkbox", {
      name: myMassAction.getLabel(1),
    });
    expect(checkbox).toHaveClass("nimbus--checkbox indeterminate");
    expect(checkbox).not.toBeChecked();
    expect(screen.getByRole("combobox"));
    expect(screen.getByRole("option", { name: myMassAction.placeholder }));
    myMassAction.options.forEach((option) =>
      expect(screen.getByRole("option", { name: option.label })).toHaveProperty(
        "value",
        option.value,
      ),
    );
  });

  it("renders Massive Select Area (checked) when all row is checked", () => {
    render(
      <Table
        headers={myHeaders}
        massAction={myMassAction}
        editMode={myEditMode}
      >
        {rows}
      </Table>,
    );
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    userEvent.click(screen.getAllByRole("checkbox")[2]);
    const checkbox: HTMLElement = screen.getByRole("checkbox", {
      name: myMassAction.getLabel(2),
    });
    expect(checkbox).not.toHaveClass("nimbus--checkbox indeterminate");
    expect(checkbox).toBeChecked();
  });

  it("renders Massive Select Area (checked) when click on check-all", () => {
    render(
      <Table
        headers={myHeaders}
        massAction={myMassAction}
        editMode={myEditMode}
      >
        {rows}
      </Table>,
    );
    const rowsCount = React.Children.count(rows);
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    const checkbox: HTMLElement = screen.getByRole("checkbox", {
      name: myMassAction.getLabel(rowsCount),
    });
    expect(checkbox).not.toHaveClass("nimbus--checkbox indeterminate");
    expect(checkbox).toBeChecked();
    // also check that all rows has been checked
    expect(screen.getAllByRole("checkbox")[1]).toBeChecked();
    expect(screen.getAllByRole("checkbox")[2]).toBeChecked();
  });

  it("unChecks all rows", () => {
    render(
      <Table
        headers={myHeaders}
        massAction={myMassAction}
        editMode={myEditMode}
      >
        {rows}
      </Table>,
    );
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    userEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getAllByRole("checkbox")[1]).not.toBeChecked();
    expect(screen.getAllByRole("checkbox")[2]).not.toBeChecked();
  });

  it("hides Massive Select Area when no rows are selected", () => {
    render(
      <Table
        headers={myHeaders}
        massAction={myMassAction}
        editMode={myEditMode}
      >
        {rows}
      </Table>,
    );
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    expect(screen.queryByRole("combobox")).toBeFalsy();
    expect(screen.getAllByRole("columnheader")).toBeTruthy();
  });

  it("renders at the end of the table", () => {
    const { container } = render(
      <Table headers={myHeaders} loading>
        {rows}
      </Table>,
    );
    expect(container.querySelector(".nimbus--spinner-wrapper")).toBeTruthy();
    expect(container.querySelector(".nimbus--spinner")).toBeTruthy();
  });

  it("calls onChange from Massive Select Area", () => {
    render(
      <Table
        headers={myHeaders}
        massAction={myMassAction}
        editMode={myEditMode}
      >
        {rows}
      </Table>,
    );
    userEvent.click(screen.getAllByRole("checkbox")[1]);
    const select: HTMLElement = screen.getByRole("combobox");
    const option: HTMLElement = screen.getByRole("option", {
      name: myMassAction.options[0].label,
    });
    userEvent.selectOptions(select, [option]);
    expect(handleChange).toHaveBeenCalledWith({
      value: myMassAction.options[0].value,
      indexRows: [0],
    });
  });

  it("does not call onClick when user click on first data row when editMode is true", () => {
    render(
      <Table headers={myHeaders} editMode>
        {rows}
      </Table>,
    );
    userEvent.click(screen.getAllByRole("row")[1]);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("calls onClick when user click on first data row", () => {
    render(<Table headers={myHeaders}>{rows}</Table>);
    userEvent.click(screen.getAllByRole("row")[1]);
    expect(handleClick).toHaveBeenCalled();
  });

  it("calls onEndScroll when scroll view intersect with end to the table", () => {
    const handleEndScroll = jest.fn();
    const { container } = render(
      <Table
        headers={myHeaders}
        marginEndScroll={myMarginEndScroll}
        onEndScroll={handleEndScroll}
      >
        {rows}
      </Table>,
    );
    const end = container.querySelector("#end");
    mockIsIntersecting(end as Element, false);
    expect(handleEndScroll).not.toHaveBeenCalled();
    mockIsIntersecting(end as Element, true);
    expect(handleEndScroll).toHaveBeenCalled();
  });

  it("does not call onEndScroll if it not provided", () => {
    const handleEndScroll = jest.fn();
    const { container } = render(<Table headers={myHeaders}>{rows}</Table>);
    const end = container.querySelector("#end");
    mockIsIntersecting(end as Element, false);
    expect(handleEndScroll).not.toHaveBeenCalled();
    mockIsIntersecting(end as Element, true);
    expect(handleEndScroll).not.toHaveBeenCalled();
  });

  it("calls onEditMode when a cell is touched while 500 milliseconds", () => {
    const handleOnEdit = jest.fn();
    render(
      <Table
        headers={myHeaders}
        massAction={myMassAction}
        onEditMode={handleOnEdit}
      >
        {rows}
      </Table>,
    );
    expect(handleOnEdit).not.toHaveBeenCalled();
    jest.useFakeTimers();
    const cell = screen.getByText(myTexts[0][0]);
    fireEvent.touchStart(cell);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    fireEvent.touchEnd(cell);
    expect(handleOnEdit).toHaveBeenCalled();
  });

  it("does not call onEditMode if it not provided", () => {
    const handleOnEdit = jest.fn();
    render(
      <Table headers={myHeaders} massAction={myMassAction}>
        {rows}
      </Table>,
    );
    expect(handleOnEdit).not.toHaveBeenCalled();
    jest.useFakeTimers();
    const cell = screen.getByText(myTexts[0][0]);
    fireEvent.touchStart(cell);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    fireEvent.touchEnd(cell);
    expect(handleOnEdit).not.toHaveBeenCalled();
  });

  it("does not call onEditMode if editMode is true", () => {
    const handleOnEdit = jest.fn();
    render(
      <Table
        headers={myHeaders}
        massAction={myMassAction}
        onEditMode={handleOnEdit}
        editMode
      >
        {rows}
      </Table>,
    );
    expect(handleOnEdit).not.toHaveBeenCalled();
    jest.useFakeTimers();
    const cell = screen.getByText(myTexts[0][0]);
    fireEvent.touchStart(cell);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    fireEvent.touchEnd(cell);
    expect(handleOnEdit).not.toHaveBeenCalled();
  });

  it("does not call onEditMode if massAction is not provided", () => {
    const handleOnEdit = jest.fn();
    render(
      <Table headers={myHeaders} onEditMode={handleOnEdit}>
        {rows}
      </Table>,
    );
    expect(handleOnEdit).not.toHaveBeenCalled();
    jest.useFakeTimers();
    const cell = screen.getByText(myTexts[0][0]);
    fireEvent.touchStart(cell);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    fireEvent.touchEnd(cell);
    expect(handleOnEdit).not.toHaveBeenCalled();
  });
});
