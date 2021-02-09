import * as React from "react";
import { render, screen } from "@testing-library/react";

import { ArchiveIcon } from "@tiendanube/icons";
import CalloutCard from ".";

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
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });
});
