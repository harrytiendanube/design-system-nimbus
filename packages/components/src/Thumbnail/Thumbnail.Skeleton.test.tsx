import * as React from "react";
import { render } from "@testing-library/react";

import Thumbnail from "./Thumbnail";

describe("<Thumbnail.Skeleton />", () => {
  it("renders defaults", () => {
    const { container } = render(<Thumbnail.Skeleton />);
    expect(
      container.querySelector(".nimbus--aspect-ratio--1-1"),
    ).toHaveAttribute("style", "width: 100%;");
  });

  it("renders optional parameters", () => {
    const { container } = render(
      <Thumbnail.Skeleton aspectRatio="16-9" width="90%" />,
    );
    expect(
      container.querySelector(".nimbus--aspect-ratio--16-9"),
    ).toHaveAttribute("style", "width: 90%;");
  });
});
