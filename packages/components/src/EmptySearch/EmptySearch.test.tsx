import * as React from "react";
import { render, screen } from "@testing-library/react";

import { EmptySearch } from "..";

const myTitle = "myTitle";
const myText = "myText";

describe("<EmptyState />", () => {
  it("render", () => {
    render(<EmptySearch title={myTitle} text={myText} />);
    expect(screen.getByText(myTitle)).toHaveClass(
      "nimbus--text nimbus--text-size--base nimbus--text-color--secondary nimbus--text-align--center nimbus--text--block nimbus--text--bold",
    );
    expect(screen.getByText(myText)).toHaveClass(
      "nimbus--text nimbus--text-size--small nimbus--text-color--light nimbus--text-align--center nimbus--text--block",
    );
  });
});
