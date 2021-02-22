/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ArchiveIcon } from "@tiendanube/icons";
import IconButton from "./IconButton";

const IconButtonComponent = (props: any) => {
  return (
    <IconButton
      icon={ArchiveIcon}
      href="http://www.myUrl.com"
      ariaLabel="Aria Label text"
      {...props}
    />
  );
};

const setup = ({ Component, props }: any | null = {}) => {
  const { container } = render(Component || <IconButtonComponent {...props} />);

  return { container, iconButton: screen.getByRole("button") };
};

describe("<IconButton/>", () => {
  it("render", () => {
    const { container, iconButton } = setup();
    expect(iconButton).toBeTruthy();
    expect(iconButton).toHaveAttribute("aria-label", "Aria Label text");
    expect(iconButton).toHaveAttribute("target", "_blank");
    expect(iconButton).toHaveAttribute("href", "http://www.myUrl.com");
    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });

  it("calls onClick", () => {
    const handleClick = jest.fn();
    const { iconButton } = setup({ props: { onClick: handleClick } });
    userEvent.click(iconButton);
    expect(handleClick).toHaveBeenCalled();
  });
});
