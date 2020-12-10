/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tabs, Text } from "..";

const TabsComponent = (props: any) => (
  <Tabs {...props}>
    <Tabs.Item label="Today">
      <Text>This is content for Today</Text>
    </Tabs.Item>
    <Tabs.Item label="Yesterday">
      <Text>This is content for Yesterday</Text>
    </Tabs.Item>
  </Tabs>
);

const setup = ({ Component, props }: any) => {
  const { container } = render(Component || <TabsComponent {...props} />);
  return { container };
};

describe("<Tabs />", () => {
  it("render", () => {
    setup({ props: {} });
    expect(screen.getByRole("tablist")).toBeTruthy();
    expect(screen.getByRole("tabpanel")).toBeTruthy();
    expect(screen.getAllByRole("presentation").length).toEqual(2);
  });
  it("render with activeTab", () => {
    setup({ props: { activeTab: 0 } });
    expect(screen.getByRole("tablist")).toBeTruthy();
    expect(screen.getByRole("tabpanel")).toBeTruthy();
    expect(screen.getAllByRole("presentation").length).toEqual(2);
  });
  it("calls onChange", () => {
    const handleOnChange = jest.fn();
    setup({ props: { onChange: handleOnChange } });
    userEvent.click(screen.getAllByRole("presentation")[1]);
    expect(handleOnChange).toHaveBeenCalled();
  });
});
