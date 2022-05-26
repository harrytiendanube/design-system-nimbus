import * as React from "react";
import { render, screen } from "@testing-library/react";

import { BaseCard, Text } from "..";

const myTextHeader = "myTextHeader";
const myTextBody = "myTextBody";
const myTextFooter = "myTextFooter";

describe("<BaseCard />", () => {
  it("render", () => {
    render(
      <BaseCard>
        <BaseCard.Header >
          <Text>{myTextHeader}</Text>
        </BaseCard.Header>
        <BaseCard.Body>
          <Text>{myTextBody}</Text>
        </BaseCard.Body>
        <BaseCard.Footer>
          <Text>{myTextFooter}</Text>
        </BaseCard.Footer>
      </BaseCard>);

    expect(screen.getByText(myTextHeader)).toBeTruthy();
    expect(screen.getByText(myTextBody)).toBeTruthy();
    expect(screen.getByText(myTextFooter)).toBeTruthy();

  });

});
