import * as React from "react";
import { render, screen } from "@testing-library/react";

import { EmptyState, Text } from "..";

const title = "Title text";

describe("Render EmptyState", () => {
  it("shows single EmptyState", () => {
    render(
      <EmptyState
        fullWidth
        image="https://d26lpennugtm8s.cloudfront.net/assets/common/img/empty-screens/empty-products.png"
        title={title}
      >
        <Text>Empty state text</Text>
      </EmptyState>,
    );

    const element: HTMLElement = screen.getByRole("heading", {
      name: title,
    });
    expect(element).toBeTruthy();
  });
});
    );

    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.getByRole("img", { name: myTitle })).toHaveAttribute(
      "src",
      myImage,
    );
    expect(screen.getByText(myText)).toBeTruthy();
    expect(screen.getByRole("button", { name: myPAL })).toBeTruthy();
    expect(screen.getByRole("button", { name: mySAL })).toBeTruthy();
  });
  it("render without fullWidth, title, primaryActionLabel, secondaryActionLabel", () => {
    render(
      <EmptyState image={myImage}>
        <Text>{myText}</Text>
      </EmptyState>,
    );

    expect(screen.queryByRole("heading", { name: myTitle })).toBeFalsy();
    expect(screen.queryByRole("img")).toHaveAttribute("src", myImage);
    expect(screen.queryByRole("button", { name: myPAL })).toBeFalsy();
    expect(screen.queryByRole("button", { name: mySAL })).toBeFalsy();
  });
  it("calls onClickPrimary and onClickSecondary", () => {
    const handleClickPrimary = jest.fn();
    const handleClickSecondary = jest.fn();
    render(
      <EmptyState
        fullWidth={myFullWidth}
        image={myImage}
        title={myTitle}
        primaryActionLabel={myPAL}
        onClickPrimary={handleClickPrimary}
        secondaryActionLabel={mySAL}
        onClickSecondary={handleClickSecondary}
      >
        <Text>{myText}</Text>
      </EmptyState>,
    );
    userEvent.click(screen.getByRole("button", { name: myPAL }));
    userEvent.click(screen.getByRole("button", { name: mySAL }));
    expect(handleClickPrimary).toHaveBeenCalled();
    expect(handleClickSecondary).toHaveBeenCalled();
  });
});
