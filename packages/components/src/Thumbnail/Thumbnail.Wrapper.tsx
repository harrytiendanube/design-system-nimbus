import * as React from "react";
import classNames from "classnames";

import "./Thumbnail.css";

export interface InterfaceThumbnailWrapper {
  children: React.ReactNode;
  /** Permitted aspect ratios for the size of the image */
  aspectRatio?: "1-1" | "16-9" | "9-16" | "4-3" | "3-4" | "2-1" | "1-2";
  /** Width value of the image. Defaults to 100% */
  width?: string;
}

function Wrapper({
  children,
  aspectRatio = "1-1",
  width = "100%",
}: InterfaceThumbnailWrapper): JSX.Element {
  const className = classNames(
    "nimbus--thumbnail-wrapper",
    `nimbus--aspect-ratio--${aspectRatio}`,
  );
  return (
    <div className={className} style={{ width }}>
      {children}
    </div>
  );
}

export default Wrapper;
