import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from ".";
import "@testing-library/jest-dom/extend-expect";

const myLabel = "Email o URL de tu tienda";

describe("Input", () => {
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
    // Should be find a componente by label
    expect(getByLabelText(myLabel)).toBeInTheDocument();
  });
  it("Change on Input fire event", () => {
    const newValue = "newValue";
    const callback = jest.fn();
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleChange = (event) => {
      expect(event.target.value).toEqual(newValue);
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
    // onChange callback should be invoked when input change
    expect(callback).toHaveBeenCalled();
  });
});
