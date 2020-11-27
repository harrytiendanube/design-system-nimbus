import * as React from "react";
import { render, screen } from "@testing-library/react";

import { ErrorState } from "..";

const myTitle = "myTitle";

describe("<ErrorState />", () => {
  it("render", () => {
    render(<ErrorState title={myTitle} />);
    expect(screen.getByText(myTitle)).toHaveClass(
      "nimbus--text nimbus--text-size--base nimbus--text-color--secondary nimbus--text-align--center nimbus--text--block nimbus--text--bold",
    );
  });
});
