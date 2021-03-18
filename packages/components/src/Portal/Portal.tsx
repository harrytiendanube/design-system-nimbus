import * as React from "react";
import * as ReactDOM from "react-dom";

import "./Portal.css";

interface InterfacePortal {
  /** React node of type children */
  children: React.ReactNode;
  /** Indicates if the Portal has to be shown */
  show: boolean;
}

function Portal({ children, show }: InterfacePortal): JSX.Element {
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

  const bodyClassName = "nimbus--portal--open";

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
    <div className={`nimbus--portal ${show ? "is-visible" : ""}`}>
      {children}
    </div>
  );
  return ReactDOM.createPortal(element, container);
}

export default Portal;
