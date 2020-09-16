import * as React from "react";
import { render, screen } from "@testing-library/react";

import { Card, Text } from "..";

const myTitle = "myTitle";
const myText = "myText";

describe("<Card />", () => {
  it("render", () => {
    render(
      <Card title={myTitle}>
        <Text>{myText}</Text>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.getByText(myText)).toBeTruthy();
  });
});
