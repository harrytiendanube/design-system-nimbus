import * as React from "react";
import { render, screen } from "@testing-library/react";

import { Table, Link, Text } from "..";

describe("Render Table", () => {
  it("shows single Table", () => {
    const labelLink = "Order #120";
    const labelDate = "20 jun";
    const headers = [{ value: "Order" }, { value: "Date" }];
    const rows: JSX.Element[][] = [
      [
        <Link key="1" href="https://www.tiendanube.com/" target="_self">
          {labelLink}
        </Link>,
        <Text key="2">{labelDate}</Text>,
      ],
    ];
    render(<Table headers={headers} rows={rows} />);
    let element: HTMLElement = screen.getByRole("table");
    expect(element).toBeTruthy();
    element = screen.getByRole("columnheader", { name: headers[0].value });
    expect(element).toBeTruthy();
    element = screen.getByRole("columnheader", { name: headers[1].value });
    expect(element).toBeTruthy();
    element = screen.getByRole("rowheader", { name: labelLink });
    expect(element).toBeTruthy();
    element = screen.getByRole("cell", { name: labelDate });
    expect(element).toBeTruthy();
  });
});
