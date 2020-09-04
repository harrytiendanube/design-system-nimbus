import * as React from "react";
import { render, screen } from "@testing-library/react";

import { CreditCardIcon } from "@tiendanube/icons";
import Label from ".";

const label = "label";

describe("Render Label", () => {
  it("shows single Label without OnClick", () => {
    render(<Label id="id-1" icon={CreditCardIcon} label={label} />);
    const element: HTMLElement = screen.getByRole("status");
    expect(element).toBeTruthy();
  });
  it("shows single Label with OnClick", () => {
    render(
      <Label
        id="id-1"
        icon={CreditCardIcon}
        label={label}
        onClick={() => null}
      />,
    );
    const element: HTMLElement = screen.getByRole("button", { name: label });
    expect(element).toBeTruthy();
  });
});
