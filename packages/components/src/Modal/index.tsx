import * as React from "react";
import * as ReactDOM from "react-dom";

import "./Modal.css";

import { CloseIcon } from "@tiendanube/icons";

import Title from "../Title";
import Button from "../Button";

interface InterfaceModal {
  /** Text to be displayed in the label */
  title: string;
  /** Indicates if the modal has to be shown */
  show: boolean;
  /** OnDismiss callback function */
  onDismiss?: () => void;
  /** React node of type children */
  children: React.ReactNode;
  /** Label of primary action */
  primaryActionLabel?: string;
  /** Label of secondary action */
  secondaryActionLabel?: string;
  /** OnClickPrimary callback function */
  onClickPrimary?: () => void;
  /** OnClickSecondary callback function */
  onClickSecondary?: () => void;
}

/**
 * @param title Text to be displayed in the label
 * @param show Indicates if the modal has to be shown
 * @param onDismiss Callback function
 * @param children React node of type children
 * @param primaryActionLabel Label of primary action
 * @param secondaryActionLabel Label of secondary action
 * @param onClickPrimary Callback function
 * @param onClickSecondary Callback function
 */

function Modal({
  title,
  show,
  onDismiss,
  children,
  primaryActionLabel,
  secondaryActionLabel = "",
  onClickPrimary,
  onClickSecondary,
}: InterfaceModal): JSX.Element {
  const handleClickOutside = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if ((event.target as HTMLElement).id === "nimbus-modal") {
        onDismiss?.();
      }
    },
    [onDismiss],
  );
  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.keyCode === 27) {
        onDismiss?.();
      }
    },
    [onDismiss],
  );
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);
  const memorizedDismissable = React.useMemo(
    () =>
      onDismiss && (
        <button
          type="button"
          aria-label="Close"
          className="nimbus--modal-header__close"
          onClick={onDismiss}
        >
          <CloseIcon />
        </button>
      ),
    [onDismiss],
  );
  const memorizedSecondary = React.useMemo(
    () =>
      secondaryActionLabel &&
      onClickSecondary && (
        <div className="nimbus--action-wrapper__item">
          <Button onClick={onClickSecondary}>{secondaryActionLabel}</Button>
        </div>
      ),
    [secondaryActionLabel, onClickSecondary],
  );
  const memorizedPrimary = React.useMemo(
    () =>
      primaryActionLabel &&
      onClickPrimary && (
        <div className="nimbus--action-wrapper__item">
          <Button onClick={onClickPrimary} appearance="primary">
            {primaryActionLabel}
          </Button>
        </div>
      ),
    [primaryActionLabel, onClickPrimary],
  );
  const container: HTMLElement = React.useMemo(
    () => document.createElement("div"),
    [],
  );
  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);
  const element: JSX.Element = (
    <div
      id="nimbus-modal"
      onClick={handleClickOutside}
      className={`nimbus--modal ${show ? "is-visible" : ""}`}
      role="presentation"
    >
      <div className="nimbus--modal-wrapper" role="dialog">
        <div className="nimbus--modal-header">
          <div className="nimbus--modal-header__title">
            <Title type="h3">{title}</Title>
          </div>
          {memorizedDismissable}
        </div>
        <div className="nimbus--modal-body">{children}</div>
        <div className="nimbus--modal-footer">
          <div className="nimbus--action-wrapper">
            {memorizedSecondary}
            {memorizedPrimary}
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(element, container);
}

export default React.memo(Modal);
