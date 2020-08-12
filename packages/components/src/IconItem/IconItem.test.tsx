import * as React from "react";
import { render, screen } from "@testing-library/react";

import { ArchiveIcon } from "@tiendanube/icons";
import IconItem from ".";

describe("Render IconItem", () => {
  it("shows single IconItem", () => {
    render(
      <IconItem appearance="default" icon={ArchiveIcon} title="Archived" />,
    );
    const element: HTMLElement = screen.getByRole("status");
    expect(element).toBeTruthy();
  });
});
