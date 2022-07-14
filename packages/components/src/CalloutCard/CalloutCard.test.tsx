import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ArchiveIcon } from "@tiendanube/icons";
import CalloutCard from "../CalloutCard";

describe("<CalloutCard />", () => {
  it("render", () => {
    const { container } = render(
      <CalloutCard
        appearance="primary"
        icon={ArchiveIcon}
        title="myTitle"
        subtitle="mySubtitle"
      />,
    );
    expect(screen.getByText("myTitle")).toBeTruthy();
    expect(screen.getByText("mySubtitle")).toBeTruthy();
    expect(container.querySelectorAll("svg")).toHaveLength(2);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("calls onClick", () => {
    const handleClick = jest.fn();
    render(
      <CalloutCard
        id="myId"
        appearance="primary"
        icon={ArchiveIcon}
        title="myTitle"
        subtitle="mySubtitle"
        onClick={handleClick}
      />,
    );
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });
});
