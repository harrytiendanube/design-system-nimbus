import * as React from "react";
import { render, screen } from "@testing-library/react";

import { Table, Link, Text } from "..";

import { InterfaceTableRow } from "../common/interfaces";

describe("Render Table", () => {
  it("shows single Table", () => {
    const labelLink = "Order #120";
    const labelDate = "20 jun";
    const headers = ["Order", "Date"];
    const rows: InterfaceTableRow[] = [
      {
        id: "120",
        columns: [
          <Link key="1" href="https://www.tiendanube.com/" target="_self">
            {labelLink}
          </Link>,
          <Text key="2">{labelDate}</Text>,
        ],
      },
    ];
    render(<Table headers={headers} rows={rows} />);
    let element: HTMLElement = screen.getByRole("table");
    expect(element).toBeTruthy();
    element = screen.getByRole("columnheader", { name: headers[0] });
    expect(element).toBeTruthy();
    element = screen.getByRole("columnheader", { name: headers[1] });
    expect(element).toBeTruthy();
    element = screen.getByRole("cell", { name: labelLink });
    expect(element).toBeTruthy();
    element = screen.getByRole("cell", { name: labelDate });
    expect(element).toBeTruthy();
  });
});
