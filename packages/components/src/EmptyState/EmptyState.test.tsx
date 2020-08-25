import * as React from "react";
import { render, screen } from "@testing-library/react";

import { EmptyState, Text } from "..";

const title = "Title text";

describe("Render EmptyState", () => {
  it("shows single EmptyState", () => {
    render(
      <EmptyState
        fullWidth
        image="https://d26lpennugtm8s.cloudfront.net/assets/common/img/empty-screens/empty-products.png"
        title={title}
      >
        <Text>Empty state text</Text>
      </EmptyState>,
    );

    const element: HTMLElement = screen.getByRole("heading", {
      name: title,
    });
    expect(element).toBeTruthy();
  });
});
