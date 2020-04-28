import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WrapGrid from "./WrapGrid";
import "@testing-library/jest-dom/extend-expect";

describe("WrapGrid", () => {
  it("Render WrapGrid ", () => {
    const iconNameFirst = "Alicorn";
    const iconNameLast = "Zhihu";
    const { queryByTestId } = render(<WrapGrid />);
    // Should be find a componente with prefix 'icon-' Example: icon-fo
    expect(queryByTestId(`icon-${iconNameFirst}`)).not.toBeNull();
    expect(queryByTestId(`icon-${iconNameLast}`)).not.toBeNull();
  });

  // it("Render empty WrapGrid ", () => {
  //   const { getByTestId, queryByTestId } = render(<WrapGrid />);
  //   const input = getByTestId("icon-search");
  //   fireEvent.change(input, { target: { value: "emptyListRadomski" } });
  //   expect(queryByTestId(`icon-Alicorn`)).toBeNull();
  // });

  it("Input filter string and Render empty Grid", () => {
    const { getByTestId, queryByTestId } = render(<WrapGrid />);
    const input = getByTestId("icon-search");
    fireEvent.change(input, { target: { value: "emptyListRadomski" } });
    expect(queryByTestId(`icon-Alicorn`)).toBeNull();
  });

  it("Input filter string", () => {
    const { getByTestId, queryByTestId } = render(<WrapGrid />);
    const input = getByTestId("icon-search");
    fireEvent.change(input, { target: { value: "fac" } });
    expect(queryByTestId(`icon-Facebook`)).not.toBeNull();
    expect(queryByTestId(`icon-FacebookF`)).not.toBeNull();
    expect(queryByTestId(`icon-FacebookMessenger`)).not.toBeNull();
    expect(queryByTestId(`icon-FacebookSquare`)).not.toBeNull();
    expect(queryByTestId(`icon-Alicorn`)).toBeNull();
  });
});
