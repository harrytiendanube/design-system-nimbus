import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, fireEvent } from "@testing-library/react";
import Alert from ".";

describe("Alert", () => {
  let jestCallback, myText, primaryLabel, secondaryLabel, title;
  beforeAll(() => {
    jestCallback = jest.fn();
    myText = "myText";
    primaryLabel = "Primary Label";
    secondaryLabel = "Secondary Label";
    title = "Title";
  });

  it("Render Alert", () => {
    const { getByText } = render(<Alert show>{myText}</Alert>);
    const component = getByText(myText);
    expect(component).toBeTruthy();
  });
  it("Alert implements title (<h5>), Button (<button>) and Link (<a>)", () => {
    const { getByText } = render(
      <Alert
        type="inline"
        appearance="primary"
        title={title}
        primaryLabel={primaryLabel}
        onClickPrimary={jestCallback}
        secondaryLabel={secondaryLabel}
        secondaryTo="http://www.tiendanube.com"
        isDismissable
        show
      >
        {myText}
      </Alert>,
    );
    expect(getByText(title)).toContainHTML("</h5>");
    expect(getByText(primaryLabel)).toContainHTML("</button>");
    expect(getByText(secondaryLabel)).toContainHTML("</a>");
  });
  it("Click on Button must run callback", () => {
    const { getByText } = render(
      <Alert primaryLabel={primaryLabel} onClickPrimary={jestCallback} show>
        {myText}
      </Alert>,
    );
    const button = getByText(primaryLabel);
    fireEvent.click(button);
    expect(jestCallback).toHaveBeenCalled();
  });
});
