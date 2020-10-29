import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EmptyState, Text } from "..";

const myTitle = "myTitle";
const myText = "myText";
const myImage = "https://www.myImage.com/";
const myFullWidth = true;
const myPrimaryActionLabel = "myPrimaryActionLabel";
const mySecondaryActionLabel = "mySecondaryActionLabel";

describe("<EmptyState />", () => {
  it("render", () => {
    const handleClickPrimary = jest.fn();
    const handleClickSecondary = jest.fn();
    render(
      <EmptyState
        fullWidth={myFullWidth}
        image={myImage}
        title={myTitle}
        primaryActionLabel={myPrimaryActionLabel}
        onClickPrimary={handleClickPrimary}
        secondaryActionLabel={mySecondaryActionLabel}
        onClickSecondary={handleClickSecondary}
      >
        <Text>{myText}</Text>
      </EmptyState>,
    );

    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.getByRole("img", { name: myTitle })).toHaveAttribute(
      "src",
      myImage,
    );
    expect(screen.getByText(myText)).toBeTruthy();
    expect(
      screen.getByRole("button", { name: myPrimaryActionLabel }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: mySecondaryActionLabel }),
    ).toBeTruthy();
  });
  it("render without optional parameters", () => {
    render(
      <EmptyState image={myImage}>
        <Text>{myText}</Text>
      </EmptyState>,
    );

    expect(screen.queryByRole("heading", { name: myTitle })).toBeFalsy();
    expect(screen.queryByRole("img")).toHaveAttribute("src", myImage);
    expect(
      screen.queryByRole("button", { name: myPrimaryActionLabel }),
    ).toBeFalsy();
    expect(
      screen.queryByRole("button", { name: mySecondaryActionLabel }),
    ).toBeFalsy();
  });
  it("calls onClickPrimary and onClickSecondary", () => {
    const handleClickPrimary = jest.fn();
    const handleClickSecondary = jest.fn();
    render(
      <EmptyState
        fullWidth={myFullWidth}
        image={myImage}
        title={myTitle}
        primaryActionLabel={myPrimaryActionLabel}
        onClickPrimary={handleClickPrimary}
        secondaryActionLabel={mySecondaryActionLabel}
        onClickSecondary={handleClickSecondary}
      >
        <Text>{myText}</Text>
      </EmptyState>,
    );
    userEvent.click(screen.getByRole("button", { name: myPrimaryActionLabel }));
    userEvent.click(
      screen.getByRole("button", { name: mySecondaryActionLabel }),
    );
    expect(handleClickPrimary).toHaveBeenCalled();
    expect(handleClickSecondary).toHaveBeenCalled();
  });
});
