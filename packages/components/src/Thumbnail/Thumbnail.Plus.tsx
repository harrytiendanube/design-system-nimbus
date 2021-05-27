import * as React from "react";

import ThumbnailButton, { InterfaceThumbnailButton } from "./Thumbnail.Button";
import Text from "../Text";

import "./Thumbnail.css";

export interface InterfaceThumbnailPlus
  extends Omit<
    InterfaceThumbnailButton,
    "children" | "className" | "disabled"
  > {
  /** URL source for the image */
  src: string;
  /** Alternative text for the image */
  altText: string;
  /** Number to be displayed next to the + symbol */
  number: number;
}

function Plus({
  src,
  altText,
  aspectRatio,
  width,
  ariaLabel,
  number,
  onClick,
}: InterfaceThumbnailPlus): JSX.Element {
  return (
    <ThumbnailButton
      aspectRatio={aspectRatio}
      width={width}
      ariaLabel={ariaLabel}
      onClick={onClick}
      className="nimbus--thumbnail-plus"
    >
      <div className="nimbus--thumbnail-overlay nimbus--thumbnail-overlay--blue">
        <Text size="featured">+{number}</Text>
      </div>
      <img src={src} alt={altText} className="nimbus--thumbnail" />
    </ThumbnailButton>
  );
}

export default Plus;
