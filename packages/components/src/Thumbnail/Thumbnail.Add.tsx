import * as React from "react";
import { PlusCircleIcon } from "@tiendanube/icons";

import ThumbnailButton, { InterfaceThumbnailButton } from "./Thumbnail.Button";
import { Text } from "..";

import "./Thumbnail.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InterfaceThumbnailAdd
  extends Omit<InterfaceThumbnailButton, "children" | "className"> {
  /** Provide additional context to the action */
  helperText?: string;
}

function Add({
  aspectRatio,
  width,
  onClick,
  disabled = false,
  ariaLabel,
  helperText,
}: InterfaceThumbnailAdd): JSX.Element {
  return (
    <ThumbnailButton
      aspectRatio={aspectRatio}
      width={width}
      ariaLabel={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className="nimbus--thumbnail-button-add"
    >
      <PlusCircleIcon size="large" />
      {helperText && (
        <Text size="small" appearance="primary" bold textAlign="center">
          {helperText}
        </Text>
      )}
    </ThumbnailButton>
  );
}

export default Add;
