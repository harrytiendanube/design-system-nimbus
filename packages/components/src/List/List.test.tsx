/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { render, screen } from "@testing-library/react";

import { List, Text } from "..";

const ListComponent = (props: any) => (
  <List {...props}>
    <List.Item>
      <Text>List item 1</Text>
    </List.Item>
    <List.Item>
      <Text>List item 2</Text>
    </List.Item>
    <List.Item>
      <Text>List item 3</Text>
    </List.Item>
  </List>
);

const setup = ({ Component, props }: any) => {
  const { container } = render(Component || <ListComponent {...props} />);
  return { container };
};

describe("<Tabs />", () => {
  it("render", () => {
    setup({ props: {} });
    expect(screen.getByRole("list")).toBeTruthy();
    expect(screen.getAllByRole("listitem").length).toEqual(3);
  });
});
