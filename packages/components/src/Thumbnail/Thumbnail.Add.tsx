import * as React from "react";
import { PlusCircleIcon } from "@tiendanube/icons";

import ThumbnailButton, { InterfaceThumbnailButton } from "./Thumbnail.Button";

import "./Thumbnail.css";

export interface InterfaceThumbnailAdd
  extends Omit<InterfaceThumbnailButton, "children" | "className"> {
  /** URL source for the image */
  src: string;
  /** Alternative text for the image */
  altText: string;
}

function Add({
  aspectRatio,
  width,
  onClick,
  disabled = false,
  ariaLabel,
}: InterfaceThumbnailAdd): JSX.Element {
  return (
    <ThumbnailButton
      aspectRatio={aspectRatio}
      width={width}
      ariaLabel={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className="nimbus--thumbnail-button"
    >
      <PlusCircleIcon size="large" />
    </ThumbnailButton>
  );
}

export default Add;
