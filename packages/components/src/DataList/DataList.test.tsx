/* eslint-disable react/jsx-props-no-spreading */

import * as React from "react";
import { render, screen } from "@testing-library/react";

import { Text, DataList, InterfaceDataList, InterfaceDataListRow } from "..";

const rows = [
  {
    order: "10",
    buyer: "Name Last name 1",
  },
  {
    order: "20",
    buyer: "Name Last name 2",
  },
  {
    order: "30",
    buyer: "Name Last name 3",
  },
];
const { Row, Cell } = DataList;

const bulkAction = {
  checked: true,
  placeholder: "Select an Option",
  label: `n selected`,
  onSelectAll: jest.fn(),
  options: [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
  ],
  valueSelected: "",
  onChange: jest.fn(),
};

interface InterfaceSetup {
  Component?: JSX.Element;
  props?: InterfaceDataList;
  propsRows?: Omit<InterfaceDataListRow, "id">;
}

const setup = ({ Component, props, propsRows }: InterfaceSetup = {}) => {
  const { container } = render(
    Component || (
      <DataList {...props}>
        {rows.map((row, index) => (
          <Row key={index} id={`${row.order}`} {...propsRows}>
            <Cell>
              <Text>{row.order}</Text>
            </Cell>
            <Cell>
              <Text>{row.buyer}</Text>
            </Cell>
          </Row>
        ))}
      </DataList>
    ),
  );
  return { container };
};

describe("<Table />", () => {
  it("renders defaults", () => {
    const { container } = setup();
    rows.forEach((row) => {
      screen.getAllByText(row.order);
      screen.getAllByText(row.buyer);
    });
    expect(screen.queryAllByRole("checkbox").length).toBe(0);
    expect(
      container.querySelectorAll(".nimbus--data-list-wrapper--ruled").length,
    ).toBe(1);
    expect(
      container.querySelectorAll(".nimbus--data-list-wrapper--spacing-base")
        .length,
    ).toBe(1);
  });

  it("renders editMode=true, ruled=false spacing=tight", () => {
    const { container } = setup({
      props: { editMode: true, ruled: false, spacing: "tight" },
      propsRows: { onChange: jest.fn() },
    });
    rows.forEach((row) => {
      screen.getAllByText(row.order);
      screen.getAllByText(row.buyer);
    });
    expect(screen.queryAllByRole("checkbox").length).toBe(rows.length);
    expect(
      container.querySelectorAll(".nimbus--data-list-wrapper--ruled").length,
    ).toBe(0);
    expect(
      container.querySelectorAll(".nimbus--data-list-wrapper--spacing-tight")
        .length,
    ).toBe(1);
  });

  it("renders editMode=true, skeleton=true", () => {
    setup({
      props: { editMode: true, skeleton: true },
      propsRows: { onChange: jest.fn() },
    });
    expect(screen.queryAllByRole("checkbox")[0]).toHaveProperty(
      "disabled",
      true,
    );
  });

  it("renders editMode=true, active=true, bulkAction  (checked = true)", () => {
    setup({
      props: { editMode: true, bulkAction },
      propsRows: { onChange: jest.fn(), active: true },
    });
    screen.getByRole("checkbox", { name: bulkAction.label });
    screen.getByRole("option", { name: bulkAction.placeholder });
    for (let i = 0; i < rows.length; i++) {
      expect(screen.queryAllByRole("checkbox")[i]).toBeChecked();
    }
  });

  it("renders editMode=true, active=false, bulkAction (checked = false)", () => {
    bulkAction.checked = false;
    setup({
      props: { editMode: true, bulkAction },
      propsRows: { onChange: jest.fn() },
    });
    expect(
      screen.queryAllByRole("checkbox", { name: bulkAction.label }).length,
    ).toBe(0);
    expect(
      screen.queryAllByRole("option", { name: bulkAction.placeholder }).length,
    ).toBe(0);
    for (let i = 0; i < rows.length; i++) {
      expect(screen.queryAllByRole("checkbox")[i]).not.toBeChecked();
    }
  });
});
