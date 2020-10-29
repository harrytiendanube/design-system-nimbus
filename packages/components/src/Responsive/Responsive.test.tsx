import * as React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";

import { Responsive, Text } from "..";

const myLabelMobile = "myLabelMobile";
const myLabelDesktop = "myLabelDesktop";
const customGlobal = global as any;

describe("<Responsive /> on Desktop", () => {
  it("render", () => {
    render(
      <>
        <Responsive display="desktop">
          <Text>{myLabelDesktop}</Text>
        </Responsive>
        <Responsive display="mobile">
          <Text>{myLabelMobile}</Text>
        </Responsive>
      </>,
    );
    expect(screen.getByText(myLabelDesktop)).toBeTruthy();
    expect(screen.queryByText(myLabelMobile)).toBeFalsy();
    // Invert contents when resize to mobile
    act(() => {
      customGlobal.innerWidth = 671;
      fireEvent(customGlobal, new Event("resize"));
    });
    expect(screen.getByText(myLabelMobile)).toBeTruthy();
    expect(screen.queryByText(myLabelDesktop)).toBeFalsy();
  });
});

describe("<Responsive /> on Mobile", () => {
  it("render", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 671,
    });
    render(
      <>
        <Responsive display="desktop">
          <Text>{myLabelDesktop}</Text>
        </Responsive>
        <Responsive display="mobile">
          <Text>{myLabelMobile}</Text>
        </Responsive>
      </>,
    );
    expect(screen.getByText(myLabelMobile)).toBeTruthy();
    expect(screen.queryByText(myLabelDesktop)).toBeFalsy();
    // Invert contents when resize to desktop
    act(() => {
      customGlobal.innerWidth = 672;
      fireEvent(customGlobal, new Event("resize"));
    });
    expect(screen.getByText(myLabelDesktop)).toBeTruthy();
    expect(screen.queryByText(myLabelMobile)).toBeFalsy();
  });
});
