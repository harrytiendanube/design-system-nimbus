import * as React from "react";
import { ExclamationTriangleIcon } from "@tiendanube/icons";

import { InterfaceThumbnail } from "./Thumbnail";

import "./Thumbnail.css";
import ThumbnailButton from "./Thumbnail.Button";

export interface InterfaceThumbnailError
  extends Omit<InterfaceThumbnail, "loading" | "children"> {
  /** Text label of the add button. Used for accessibility */
  ariaLabel: string;
  /** OnClick callback to retry */
  onClick: () => void;
}

function Error({
  aspectRatio,
  width,
  src,
  altText,
  onClick,
  ariaLabel,
}: InterfaceThumbnailError): JSX.Element {
  return (
    <ThumbnailButton
      aspectRatio={aspectRatio}
      width={width}
      ariaLabel={ariaLabel}
      onClick={onClick}
    >
      <div className="nimbus--thumbnail-overlay nimbus--thumbnail-overlay--white">
        <span className="nimbus--thumbnail-error">
          <ExclamationTriangleIcon size="large" />
        </span>
      </div>
      <img src={src} alt={altText} className="nimbus--thumbnail" />
    </ThumbnailButton>
  );
}

export default Error;
