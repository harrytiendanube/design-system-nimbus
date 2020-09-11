import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Chip } from "..";

const myId = "myId";
const myLabel = "myLabel";

describe("<Chip />", () => {
  it("render", () => {
    const { container } = render(
      <Chip id={myId} label={myLabel} onDismiss={jest.fn()} />,
    );
    expect(screen.getByRole("button", { name: myLabel })).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("calls onChange", () => {
    const handleDismiss = (id: string) => {
      expect(id).toBe(myId);
    };
    render(<Chip id={myId} label={myLabel} onDismiss={handleDismiss} />);
    const element: HTMLElement = screen.getByRole("button", { name: myLabel });
    userEvent.click(element);
  });
});
