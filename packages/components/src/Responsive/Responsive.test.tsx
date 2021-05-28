import * as React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";

import { Responsive, Text, limitsWith } from "..";

const myLabelMobile = "myLabelMobile";
const myLabelTablet = "myLabelTablet";
const myLabelDesktop = "myLabelDesktop";
const myLabelMobileAndTablet = "myLabelMobileAndTablet";
const myLabelTabletAndDesktop = "myLabelTabletAndDesktop";
const customGlobal = global as any;

describe("<Responsive /> on Desktop", () => {
  it("render", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: limitsWith.desktop.min,
    });
    render(
      <>
        <Responsive displays={["mobile"]}>
          <Text>{myLabelMobile}</Text>
        </Responsive>
        <Responsive displays={["tablet"]}>
          <Text>{myLabelTablet}</Text>
        </Responsive>
        <Responsive displays={["mobile", "tablet"]}>
          <Text>{myLabelMobileAndTablet}</Text>
        </Responsive>
        <Responsive displays={["desktop"]}>
          <Text>{myLabelDesktop}</Text>
        </Responsive>
        <Responsive displays={["tablet", "desktop"]}>
          <Text>{myLabelTabletAndDesktop}</Text>
        </Responsive>
      </>,
    );
    expect(screen.queryByText(myLabelMobile)).toBeFalsy();
    expect(screen.queryByText(myLabelTablet)).toBeFalsy();
    expect(screen.queryByText(myLabelMobileAndTablet)).toBeFalsy();
    expect(screen.queryByText(myLabelDesktop)).toBeTruthy();
    expect(screen.queryByText(myLabelTabletAndDesktop)).toBeTruthy();
    act(() => {
      customGlobal.innerWidth = limitsWith.tablet.min;
      fireEvent(customGlobal, new Event("resize"));
    });
    expect(screen.queryByText(myLabelMobile)).toBeFalsy();
    expect(screen.queryByText(myLabelTablet)).toBeTruthy();
    expect(screen.queryByText(myLabelMobileAndTablet)).toBeTruthy();
    expect(screen.queryByText(myLabelDesktop)).toBeFalsy();
    expect(screen.queryByText(myLabelTabletAndDesktop)).toBeTruthy();
    act(() => {
      customGlobal.innerWidth = limitsWith.mobile.min;
      fireEvent(customGlobal, new Event("resize"));
    });
    expect(screen.queryByText(myLabelMobile)).toBeTruthy();
    expect(screen.queryByText(myLabelTablet)).toBeFalsy();
    expect(screen.queryByText(myLabelMobileAndTablet)).toBeTruthy();
    expect(screen.queryByText(myLabelDesktop)).toBeFalsy();
    expect(screen.queryByText(myLabelTabletAndDesktop)).toBeFalsy();
  });
});
/*
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
*/
