import * as React from "react";
import { render, screen } from "@testing-library/react";

import ImageGallery from ".";

describe("<ImageGallery />", () => {
  it("render", () => {
    render(
      <ImageGallery
        name="image-gallery"
        onAddImage={jest.fn()}
        emptyLabel="Load your first picture"
      >
        <ImageGallery.Item onDelete={jest.fn()} src="http://www.myurl.com" />
      </ImageGallery>,
    );
    const element: HTMLElement = screen.getByRole("button");
    expect(element).toBeTruthy();
  });
});
