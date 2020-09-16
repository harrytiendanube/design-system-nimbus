import * as React from "react";
import { render, screen } from "@testing-library/react";

import { Page, Text } from "..";

const myTitle = "myTitle";
const mySubtitle = "mySubtitle";
const myLink = "myLink";
const myLinkTo = "https://www.myLinkTo.com/";
const myPageTextContent = "myPageTextContent";

describe("<Page />", () => {
  it("render", () => {
    render(
      <Page
        title={myTitle}
        subtitle={mySubtitle}
        link={myLink}
        linkTo={myLinkTo}
      >
        <Text>{myPageTextContent}</Text>
      </Page>,
    );
    expect(screen.getByText(myTitle)).toBeTruthy();
    expect(screen.getByText(mySubtitle)).toBeTruthy();
    expect(screen.getByRole("link", { name: myLink })).toHaveAttribute(
      "href",
      myLinkTo,
    );
    expect(screen.getByText(myPageTextContent)).toBeTruthy();
  });
});
