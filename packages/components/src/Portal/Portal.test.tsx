import * as React from "react";
import { render } from "@testing-library/react";

import { Portal, Text } from "..";

describe("<Portal />", () => {
  it("render", () => {
    render(
      <Portal show>
        <Text>myText</Text>
      </Portal>,
    );
  });
});
