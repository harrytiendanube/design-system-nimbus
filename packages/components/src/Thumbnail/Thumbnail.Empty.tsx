import * as React from "react";
import { Icon as IconType } from "@tiendanube/icons";

import "./Thumbnail.css";

import Wrapper, { InterfaceThumbnailWrapper } from "./Thumbnail.Wrapper";

export interface InterfaceThumbnailEmpty
  extends Omit<InterfaceThumbnailWrapper, "children"> {
  /** Icon to show in the placeholder when no src is provided */
  placeholderIcon: IconType;
}

function Empty({
  aspectRatio,
  width,
  placeholderIcon: Icon,
}: InterfaceThumbnailEmpty): JSX.Element {
  return (
    <Wrapper aspectRatio={aspectRatio} width={width}>
      <div className="nimbus--thumbnail-placeholder">
        <Icon size="large" />
      </div>
    </Wrapper>
  );
}

export default Empty;
