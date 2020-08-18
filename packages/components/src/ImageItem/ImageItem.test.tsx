import * as React from "react";
import { render, screen } from "@testing-library/react";

import ImageItem from ".";

describe("Render ImageItem", () => {
  it("shows single ImageItem", () => {
    render(
      <ImageItem
        thumbnail="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=943&q=80"
        link="Product"
        linkTo="https://www.tiendanube.com/"
        subtitle="Variant"
        description="1 x $3.500"
      />,
    );
    const element: HTMLElement = screen.getByRole("listitem");
    expect(element).toBeTruthy();
  });
});
