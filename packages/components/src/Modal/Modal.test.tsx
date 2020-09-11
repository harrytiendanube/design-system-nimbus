import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Modal, Text } from "..";

const myShow = true;
const myTitle = "myTitle";
const myPAL = "myPrimaryActionLabel";
const mySAL = "mySecondaryActionLabel";

const myTextModal = "myTextModal";
describe("<Modal />", () => {
  it("render", () => {
    render(
      <Modal
        show={myShow}
        title={myTitle}
        primaryActionLabel={myPAL}
        secondaryActionLabel={mySAL}
        onDismiss={jest.fn}
        onClickPrimary={jest.fn}
        onClickSecondary={jest.fn}
      >
        <Text>{myTextModal}</Text>
      </Modal>,
    );
    expect(screen.getByRole("presentation")).toHaveClass(
      "nimbus--modal is-visible",
    );
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.getByRole("button", { name: myPAL })).toBeTruthy();
    expect(screen.getByRole("button", { name: mySAL })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Close" })).toBeTruthy();
  });

  it("hides when show is false", () => {
    render(
      <Modal
        show={false}
        title={myTitle}
        primaryActionLabel={myPAL}
        secondaryActionLabel={mySAL}
        onDismiss={jest.fn}
        onClickPrimary={jest.fn}
        onClickSecondary={jest.fn}
      >
        <Text>{myTextModal}</Text>
      </Modal>,
    );
    expect(screen.getByRole("presentation")).not.toHaveClass(
      "nimbus--modal is-visible",
    );
  });

  it("renders without optional parameters", () => {
    render(
      <Modal show={myShow} title={myTitle}>
        <Text>{myTextModal}</Text>
      </Modal>,
    );
    expect(screen.getByRole("presentation")).toHaveClass(
      "nimbus--modal is-visible",
    );
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: myTitle })).toBeTruthy();
    expect(screen.queryByRole("button", { name: myPAL })).toBeFalsy();
    expect(screen.queryByRole("button", { name: mySAL })).toBeFalsy();
    expect(screen.queryByRole("button", { name: "Close" })).toBeFalsy();
  });

  it("calls onClickPrimary when primary action button is pressed", () => {
    const handleClick = jest.fn();
    render(
      <Modal
        show={myShow}
        title={myTitle}
        primaryActionLabel={myPAL}
        onClickPrimary={handleClick}
      >
        <Text>{myTextModal}</Text>
      </Modal>,
    );
    userEvent.click(screen.getByRole("button", { name: myPAL }));
    expect(handleClick).toHaveBeenCalled();
  });

  it("calls onClickSecondary when secondary action button is pressed", () => {
    const handleClick = jest.fn();
    render(
      <Modal
        show={myShow}
        title={myTitle}
        secondaryActionLabel={mySAL}
        onClickSecondary={handleClick}
      >
        <Text>{myTextModal}</Text>
      </Modal>,
    );
    userEvent.click(screen.getByRole("button", { name: mySAL }));
    expect(handleClick).toHaveBeenCalled();
  });

  it("calls onDismiss when close button is pressed", () => {
    const handleDismiss = jest.fn();
    render(
      <Modal show={myShow} title={myTitle} onDismiss={handleDismiss}>
        <Text>{myTextModal}</Text>
      </Modal>,
    );
    userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(handleDismiss).toHaveBeenCalled();
  });

  it("calls onDismiss when user press ESC", () => {
    const handleDismiss = jest.fn();
    render(
      <Modal show={myShow} title={myTitle} onDismiss={handleDismiss}>
        <Text>{myTextModal}</Text>
      </Modal>,
    );
    userEvent.type(screen.getByRole("presentation"), "{esc}");
    expect(handleDismiss).toHaveBeenCalled();
  });

  it("calls onDismiss when click outside", () => {
    const handleDismiss = jest.fn();
    render(
      <Modal show={myShow} title={myTitle} onDismiss={handleDismiss}>
        <Text>{myTextModal}</Text>
      </Modal>,
    );
    userEvent.click(screen.getByRole("presentation"));
    expect(handleDismiss).toHaveBeenCalled();
  });

  it('does not call onDismiss when user press a key "not" ESC', () => {
    const handleDismiss = jest.fn();
    render(
      <Modal show={myShow} title={myTitle} onDismiss={handleDismiss}>
        <Text>{myTextModal}</Text>
      </Modal>,
    );
    fireEvent.keyDown(screen.getByRole("presentation"), { key: "Enter" });
    expect(handleDismiss).not.toHaveBeenCalled();
  });

  it("does not call onDismiss when user press ESC when it is not provided", () => {
    render(
      <Modal show={myShow} title={myTitle}>
        <Text>{myTextModal}</Text>
      </Modal>,
    );
    userEvent.type(screen.getByRole("presentation"), "{esc}");
  });
});
