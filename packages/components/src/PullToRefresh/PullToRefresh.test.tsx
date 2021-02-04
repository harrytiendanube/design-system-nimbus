/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { render, screen } from "@testing-library/react";

import { PullToRefresh, Text } from "..";

const PullToRefreshComponent = (props: any) => (
  <PullToRefresh onRefresh={jest.fn()}>
    <Text block>Line 1 content</Text>
    <Text block>Line 2 content</Text>
    <Text block>Line 3 content</Text>
    <Text block>Line 4 content</Text>
    <Text block>Line 5 content</Text>
    <Text block>Line 6 content</Text>
    <Text block>Line 7 content</Text>
    <Text block>Line 8 content</Text>
    <Text block>Line 9 content</Text>
    <Text block>Line 10 content</Text>
  </PullToRefresh>
);

const setup = ({ Component, props }: any | null = {}) => {
  const { container } = render(
    Component || <PullToRefreshComponent {...props} />,
  );
  return { container };
};

describe("<PullToRefresh />", () => {
  it("render", () => {
    setup();
  });
});
