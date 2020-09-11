import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EmptyState, Text } from "..";

const myTitle = "myTitle";
const myText = "myText";
const myImage = "https://www.myImage.com/";
const myFullWidth = true;
const myPAL = "myPAL";
const mySAL = "mySAL";

describe("<EmptyState />", () => {
  it("render", () => {
    render(
      <EmptyState
        fullWidth={myFullWidth}
        image={myImage}
        title={myTitle}
        primaryActionLabel={myPAL}
        secondaryActionLabel={mySAL}
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
