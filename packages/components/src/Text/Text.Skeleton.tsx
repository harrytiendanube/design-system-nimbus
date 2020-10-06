import * as React from "react";
import classNames from "classnames";

export interface InterfaceTextSkeleton {
  /** Width of the skeleton component */
  width?: "small" | "medium" | "large" | "fill";
}
/** @param width Width of the skeleton component */
function Skeleton({ width = "medium" }: InterfaceTextSkeleton): JSX.Element {
  const skeletonClassName = React.useMemo(
    () => classNames(`nimbus--text-skeleton--${width}`),
    [width],
  );

  return <div className={skeletonClassName} />;
}

export default React.memo(Skeleton);
