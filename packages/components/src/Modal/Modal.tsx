import * as React from "react";

import "./Modal.css";

import { CloseIcon } from "@tiendanube/icons";

import { Title, Button, InterfaceButton } from "..";

import BaseModal from "./BaseModal";

export interface InterfaceModal {
  /** Text to be displayed in the label */
  title: string;
  /** Indicates if the modal has to be shown */
  show: boolean;
  /** OnDismiss callback function */
  onDismiss?: () => void;
  /** React node of type children */
  children: React.ReactNode;
  /** Primary Action */
  primaryAction?: Pick<InterfaceButton, "children" | "onClick" | "appearance">;
  /** Secondary Action */
  secondaryAction?: Pick<InterfaceButton, "children" | "onClick">;
}

/**
 * @param title Text to be displayed in the label
 * @param show Indicates if the modal has to be shown
 * @param onDismiss Callback function
 * @param children React node of type children
 * @param primaryAction Primary Action
 * @param secondaryAction Secondary Action
 */

function Modal({
  title,
  show,
  onDismiss,
  children,
  primaryAction,
  secondaryAction,
}: InterfaceModal): JSX.Element {
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
  const memorizedSecondary = secondaryAction && (
    <div className="nimbus--action-wrapper__item">
      <Button onClick={secondaryAction.onClick}>
        {secondaryAction.children}
      </Button>
    </div>
  );
  const memorizedPrimary = primaryAction && (
    <div className="nimbus--action-wrapper__item">
      <Button
        onClick={primaryAction.onClick}
        appearance={primaryAction.appearance}
      >
        {primaryAction.children}
      </Button>
    </div>
  );

  return (
    <BaseModal show={show} onDismiss={onDismiss}>
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
    </BaseModal>
  );
}

export default Modal;
