import * as React from "react";
import { render, screen } from "@testing-library/react";

import Toast from ".";

describe("<Toast />", () => {
  it("render", (done) => {
    const handleOnClose = jest.fn();
    const { container } = render(
      <Toast label="myLabel" onClose={handleOnClose} />,
      { container: document.body },
    );
    expect(screen.getByText("myLabel")).toBeTruthy();
    expect(container.querySelector(".nimbus--toast--primary")).toBeTruthy();
    setTimeout(() => {
      expect(handleOnClose).toHaveBeenCalledTimes(1);
      done();
    }, 4300);
  });
  it("render with appearance", () => {
    const handleOnClose = jest.fn();
    const { container } = render(
      <Toast label="myLabel" appearance="secondary" onClose={handleOnClose} />,
      { container: document.body },
    );
    expect(screen.getByText("myLabel")).toBeTruthy();
    expect(container.querySelector(".nimbus--toast--secondary")).toBeTruthy();
  });
});
