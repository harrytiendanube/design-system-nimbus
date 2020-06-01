import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Alert from ".";

describe("Alert", () => {
  it("Render Alert", () => {
    const myText = "myText";
    const { getByText } = render(<Alert show>{myText}</Alert>);
    const component = getByText(myText);
    expect(component).toBeTruthy();
  });
  it("Alert implements title (<h5>), Button (<button>) and Link (<a>)", () => {
    const myText = "myText";
    const { getByText } = render(
      <Alert
        type="inline"
        appearance="primary"
        title="Title"
        primaryLabel="Primary Label"
        onClickPrimary={(): void => {}}
        secondaryLabel="Secondary Label"
        secondaryTo="http://www.tiendanube.com"
        isDismissable
        show
      >
        {myText}
      </Alert>,
    );
    expect(getByText("Title")).toContainHTML("</h5>");
    expect(getByText("Primary Label")).toContainHTML("</button>");
    expect(getByText("Secondary Label")).toContainHTML("</a>");
  });
  it("Click on Button must run callback", () => {
    const callback = jest.fn();
    const myText = "myText";
    const { getByText } = render(
      <Alert primaryLabel="Primary Label" onClickPrimary={callback} show>
        {myText}
      </Alert>,
    );
    const button = getByText("Primary Label");
    fireEvent.click(button);
    expect(callback).toHaveBeenCalled();
  });
});