import * as React from "react";
import { render } from "@testing-library/react";

import { Layout, Text } from "..";

describe("<Layout />", () => {
  it("render", () => {
    const { container } = render(
      <Layout appearance="aside">
        <Layout.Section isMain>
          <Text>Left column</Text>
        </Layout.Section>
        <Layout.Section>
          <Text>Right column</Text>
        </Layout.Section>
      </Layout>,
    );
    expect(container.querySelector("main")).toBeTruthy();
  });
  it("render without appearance", () => {
    const { container } = render(
      <Layout>
        <Layout.Section>
          <Text>Left column</Text>
        </Layout.Section>
        <Layout.Section>
          <Text>Right column</Text>
        </Layout.Section>
      </Layout>,
    );
    expect(container.querySelector("main")).toBeTruthy();
  });
});
