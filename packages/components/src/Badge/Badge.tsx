import * as React from "react";

import classNames from "classnames";

import "./Badge.css";

export interface InterfaceBadge {
  /** Label to be displayed inside badge */
  label: React.ReactText;
  /** Appearance value determines the color of the badge and label */
  appearance?: "default" | "primary" | "secondary" | "danger";
}

function Badge({ label, appearance = "default" }: InterfaceBadge): JSX.Element {
  const badgeClassName = classNames(
    "nimbus--badge",
    `nimbus--badge--${appearance}`,
  );

  return <span className={badgeClassName}>{label}</span>;
}

const Skeleton = () => <span className="nimbus--badge-skeleton" />;

Badge.Skeleton = Skeleton;

export default Badge;
