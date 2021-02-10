import * as React from "react";
import * as ReactDOM from "react-dom";

import "./Modal.css";

export interface InterfaceBaseModal {
  /** Indicates if the modal has to be shown */
  show: boolean;
  /** OnDismiss callback function */
  onDismiss?: () => void;
  /** React node of type children */
  children: React.ReactNode;
}

function BaseModal({
  show,
  onDismiss,
  children,
}: InterfaceBaseModal): JSX.Element {
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

  const bodyClassName = "nimbus--modal--open";
  React.useEffect(() => {
    if (show) {
      document.body.classList.add(bodyClassName);
    } else {
      document.body.classList.remove(bodyClassName);
    }
    return () => {
      document.body.classList.remove(bodyClassName);
    };
  }, [show]);
  const element: JSX.Element = (
    <div
      id="nimbus-modal"
      onClick={handleClickOutside}
      className={`nimbus--modal ${show ? "is-visible" : ""}`}
      role="presentation"
    >
      <div className="nimbus--modal-wrapper" role="dialog">
        {children}
      </div>
    </div>
  );
  return ReactDOM.createPortal(element, container);
}

export default BaseModal;
