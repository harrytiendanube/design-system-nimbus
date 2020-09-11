import React from "react";
import { render, screen } from "@testing-library/react";

import Title from ".";

const myText = "myText";

describe("<Title />", () => {
  it("render", () => {
    render(<Title>{myText}</Title>);
    expect(screen.getByRole("heading", { name: myText })).toContainHTML("<h1");
  });
  it('render type="h1"', () => {
    render(<Title type="h1">{myText}</Title>);
    expect(screen.getByRole("heading", { name: myText })).toContainHTML("<h1");
  });
  it('render type="h2"', () => {
    render(<Title type="h2">{myText}</Title>);
    expect(screen.getByRole("heading", { name: myText })).toContainHTML("<h2");
  });
  it('render type="h3"', () => {
    render(<Title type="h3">{myText}</Title>);
    expect(screen.getByRole("heading", { name: myText })).toContainHTML("<h3");
  });
  it('render type="h4"', () => {
    render(<Title type="h4">{myText}</Title>);
    expect(screen.getByRole("heading", { name: myText })).toContainHTML("<h4");
  });
  it('render type="h5"', () => {
    render(<Title type="h5">{myText}</Title>);
    expect(screen.getByRole("heading", { name: myText })).toContainHTML("<h5");
  });
});
