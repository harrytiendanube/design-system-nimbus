import * as React from "react";
import { render } from "@testing-library/react";

import { Layout, Text } from "..";

describe("<Layout />", () => {
  it("render", () => {
    const { container } = render(
      <Layout appearance="fluid">
        <section>
          <Text>Left column</Text>
        </section>
        <section>
          <Text>Right column</Text>
        </section>
      </Layout>,
    );
    expect(container.querySelector("main")).toBeTruthy();
  });
});
