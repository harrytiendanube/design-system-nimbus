import * as React from "react";
import classNames from "classnames";

export interface InterfaceTextSkeleton {
  /** Size of the text component */
  size?: "featured" | "base" | "small";
  /** Width of the skeleton component */
  width?: "small" | "medium" | "large" | "fill";
}
function Skeleton({
  width = "medium",
  size = "base",
}: InterfaceTextSkeleton): JSX.Element {
  const skeletonClassName = classNames(
    "nimbus--text-skeleton",
    `nimbus--text-skeleton--width-${width}`,
    `nimbus--text-skeleton--size-${size}`,
  );

  return <div className={skeletonClassName} />;
}

export default React.memo(Skeleton);
