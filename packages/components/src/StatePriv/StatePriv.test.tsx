import * as React from "react";
import { render, screen } from "@testing-library/react";
import { SearchIcon } from "@tiendanube/icons";
import { StatePriv } from "..";

describe("<StatePriv />", () => {
  it("render", () => {
    render(
      <StatePriv
        title="myTitle"
        text="myText"
        icon={SearchIcon}
        action={{ children: "Retry", onClick: jest.fn() }}
      />,
    );
    expect(screen.getByText("myTitle")).toHaveClass(
      "nimbus--text nimbus--text-size--base nimbus--text-color--secondary nimbus--text-align--center nimbus--text--block nimbus--text--bold",
    );
    expect(screen.getByText("myText")).toHaveClass(
      "nimbus--text nimbus--text-size--small nimbus--text-color--light nimbus--text-align--center nimbus--text--block",
    );
  });
});
