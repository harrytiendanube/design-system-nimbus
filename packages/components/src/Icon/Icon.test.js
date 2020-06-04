import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render } from "@testing-library/react";
import Icon from ".";

describe("Icon", () => {
  it("Render Icon", () => {
    const iconName = "Alicorn";
    const { getByTestId } = render(<Icon name={`${iconName}`} />);
    // Should be find a componente with prefix 'icon-' Example: icon-foo
    expect(getByTestId(`icon-${iconName}`)).toBeInTheDocument();
  });
});
