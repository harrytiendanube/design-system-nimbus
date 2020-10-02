import * as React from "react";
import { render, screen } from "@testing-library/react";

import { ArchiveIcon } from "@tiendanube/icons";

import Timeline from ".";

const myTitle = "myTitle";
const myAppearance = "default";
const myDescription = "myDescription";
const myDate = "myDate";
const myTime = "myTime";
const classItemPrefix =
  "nimbus--text nimbus--text-size--small nimbus--text-color--";

describe("<Text />", () => {
  it("render", () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item
          icon={ArchiveIcon}
          appearance={myAppearance}
          title={myTitle}
          description={myDescription}
          date={myDate}
          time={myTime}
        />
      </Timeline>,
    );
    expect(container.querySelectorAll("div")[0]).toHaveClass(
      "nimbus--timeline-wrapper",
    );
    expect(container.querySelectorAll("div")[1]).toHaveClass(
      "nimbus--timeline-item",
    );
    expect(container.querySelectorAll("div")[2]).toHaveClass(
      "nimbus--timeline-icon nimbus--timeline-icon--default",
    );
    expect(container.querySelector("svg")).toBeTruthy();

    expect(screen.getByText(myTitle)).toHaveClass(
      `${classItemPrefix}default nimbus--text-align--left`,
    );
    expect(screen.getByText(myDescription)).toHaveClass(
      `${classItemPrefix}light nimbus--text-align--left`,
    );
    expect(screen.getByText(myDate)).toHaveClass(
      `${classItemPrefix}default nimbus--text-align--right`,
    );
    expect(screen.getByText(myTime)).toHaveClass(
      `${classItemPrefix}light nimbus--text-align--right`,
    );
  });

  it("render without optional params", () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item title={myTitle} date={myDate} time={myTime} />
      </Timeline>,
    );
    expect(container.querySelectorAll("div")[2]).toHaveClass(
      "nimbus--timeline-no-icon",
    );
  });
});
