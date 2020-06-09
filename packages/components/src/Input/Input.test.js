/* eslint-disable spellcheck/spell-checker */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, fireEvent } from "@testing-library/react";
import Input from ".";

describe("Input", () => {
  let myLabel, callback, newValue;
  beforeAll(() => {
    myLabel = "Store's Email o URL";
    newValue = "newValue";
    callback = jest.fn();
  });
  it("Render Input", () => {
    const { getByLabelText } = render(
      <Input
        label={myLabel}
        value="nimbus@tiendanube.com"
        placeholder="example@mail.com"
        name="email"
        onChange={jest.fn()}
      />,
    );
    // Should be find a component by label
    expect(getByLabelText(myLabel)).toBeInTheDocument();
    expect(getByLabelText(myLabel)).toHaveAttribute("name");
  });
  it("Should be return an Input with atttribute name", () => {
    const { getByLabelText } = render(
      <Input
        label={myLabel}
        value="nimbus@tiendanube.com"
        placeholder="example@mail.com"
        name="email"
        onChange={jest.fn()}
      />,
    );
    expect(getByLabelText(myLabel)).toHaveAttribute("name");
  });
  it("Change on Input fire event", () => {
    const handleChange = ({ target: { value } }) => {
      expect(value).toEqual(newValue);
      callback();
    };

    const { getByLabelText } = render(
      <Input
        label={myLabel}
        value="nimbus@tiendanube.com"
        placeholder="example@mail.com"
        name="email"
        onChange={handleChange}
      />,
    );
    fireEvent.change(getByLabelText(myLabel), {
      target: { value: newValue },
    });

    expect(callback).toHaveBeenCalled();
  });
});
