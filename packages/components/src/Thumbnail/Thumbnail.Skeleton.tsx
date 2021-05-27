import * as React from "react";

import Wrapper from "./Thumbnail.Wrapper";

export interface InterfaceThumbnailSkeleton {
  /** Permitted aspect ratios for the size of the image */
  aspectRatio?: "1-1" | "16-9" | "9-16" | "4-3" | "3-4" | "2-1" | "1-2";
  /** Width value of the image. Defaults to 100% */
  width?: string;
}

function Skeleton({
  aspectRatio = "1-1",
  width = "100%",
}: InterfaceThumbnailSkeleton): JSX.Element {
  return (
    <Wrapper aspectRatio={aspectRatio} width={width}>
      <div className="nimbus--thumbnail-skeleton" />
    </Wrapper>
  );
}

export default Skeleton;
