import * as React from "react";
import * as ReactDOM from "react-dom";

import "./Toast.css";

import classNames from "classnames";
import {
  InfoCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@tiendanube/icons";
import { Text } from "..";

export interface InterfaceToast {
  /** Label */
  label: string;
  /** Appearance */
  appearance?: "primary" | "secondary" | "success" | "warning" | "danger";
  /** OnClose callback */
  onClose: () => void;
}

function Toast({
  label,
  appearance = "primary",
  onClose,
}: InterfaceToast): JSX.Element {
  const iconVariants = {
    primary: InfoCircleIcon,
    secondary: InfoCircleIcon,
    danger: ExclamationTriangleIcon,
    success: CheckCircleIcon,
    warning: ExclamationCircleIcon,
  };

  const Icon = iconVariants[appearance];

  const [show, setShow] = React.useState(false);

  const wrapperClassName = classNames("nimbus--toast-wrapper", {
    "is--visible": show,
  });

  const className = classNames(
    "nimbus--toast",
    `nimbus--toast--${appearance}`,
    appearance,
  );
  const container: HTMLElement = React.useMemo(
    () => document.createElement("div"),
    [],
  );

  const time = React.useRef<number>();

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  React.useEffect(() => {
    setTimeout(() => setShow(true), 10);
    time.current = window.setTimeout(() => {
      // window.setTimeout() is used explicitly to avoid typescript error
      setShow(false);
      setTimeout(() => onClose(), 200); // this timeout is to allow render the out transition
    }, 4000);
    return () => {
      clearTimeout(time.current);
    };
  }, [onClose]);

  const element: JSX.Element = (
    <div className={wrapperClassName}>
      <div className={className}>
        <Icon />
        <Text size="small">{label}</Text>
      </div>
    </div>
  );

  return ReactDOM.createPortal(element, container);
}

export default Toast;
