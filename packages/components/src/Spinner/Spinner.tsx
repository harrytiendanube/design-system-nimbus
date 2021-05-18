import * as React from "react";

import "./Spinner.css";

import classNames from "classnames";

export interface InterfaceSpinner {
  /** Label */
  size?: "small" | "base" | "medium" | "large";
  /** Appearance */
  appearance?: "primary" | "secondary" | "danger" | "light";
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

  const spinnerSize = {
    small: "8",
    base: "16",
    medium: "24",
    large: "32",
  };

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={spinnerSize[size]}
      height={spinnerSize[size]}
      viewBox="0 0 16 16"
    >
      <path className="nimbus--spinner__left" d="M8,14A6,6,0,0,1,8,2" />
      <path className="nimbus--spinner__right" d="M8,2A6,6,0,0,1,8,14" />
    </svg>
  );
}

export default Spinner;
