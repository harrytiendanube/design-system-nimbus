import React from "react";
import { render } from "@testing-library/react";
import WrapGrid from "./WrapGrid";
import "@testing-library/jest-dom/extend-expect";

describe("WrapGrid", () => {
  it("Render Icon", () => {
    const iconNameFirst = "Alicorn";
    const iconNameLast = "Zhihu";
    const { getByTestId } = render(<WrapGrid />);
    // Should be find a componente with prefix 'icon-' Example: icon-foo
    expect(getByTestId(`icon-${iconNameFirst}`)).toBeInTheDocument();
    expect(getByTestId(`icon-${iconNameLast}`)).toBeInTheDocument();
  });
});
