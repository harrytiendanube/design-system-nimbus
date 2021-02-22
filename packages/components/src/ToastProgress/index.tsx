import * as React from "react";
import * as ReactDOM from "react-dom";

import "./ToastProgress.css";

import classNames from "classnames";
import { Text, Spinner } from "..";

export interface InterfaceToastProgress {
  /** Label */
  label: string;
  /** Progress percentage */
  percentage?: number;
  /** Determines whether or not the toast is shown */
  show: boolean;
}

function ToastProgress({
  label,
  show,
  percentage,
}: InterfaceToastProgress): JSX.Element {
  const wrapperClassName = classNames("nimbus--toast-progress-wrapper", {
    "is--visible": show,
  });

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
    <div className={wrapperClassName}>
      <div className="nimbus--toast-progress">
        <Spinner />
        <Text>{label}</Text>
        {percentage && <Text bold>{percentage}%</Text>}
      </div>
    </div>
  );

  return ReactDOM.createPortal(element, container);
}

export default ToastProgress;
