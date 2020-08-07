import * as React from "react";
import { render, screen } from "@testing-library/react";

import { Select, Modal } from "..";

describe("Render Select", () => {
  it("shows single select", () => {
    render(
      <Modal
        show
        title="Filter by"
        primaryActionLabel="primaryActionLabel"
        secondaryActionLabel="secondaryActionLabel"
      >
        <Select
          label="label"
          name="status"
          options={[{ label: "label 1", value: "value 1" }]}
        />
      </Modal>,
    );
    const element: HTMLElement = screen.getByRole("presentation");
    expect(element).toBeTruthy();
  });
});
