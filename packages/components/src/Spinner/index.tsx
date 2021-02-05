import * as React from "react";

import "./Spinner.css";

import classNames from "classnames";

export interface InterfaceSpinner {
  /** Label */
  size?: "small" | "base" | "medium" | "large";
  /** Appearance */
  appearance?: "primary" | "secondary" | "danger";
}

function Spinner({
  size = "base",
  appearance = "primary",
}: InterfaceSpinner): JSX.Element {
  const className = classNames(
    "nimbus--spinner",
    `nimbus--spinner--${appearance}`,
    `nimbus--spinner--${size}`,
  );

  return <div className={className} />;
}

export default Spinner;
