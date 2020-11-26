import * as React from "react";

import { TrashIcon } from "@tiendanube/icons";

export interface InterfaceImageGalleryItem {
  /** Image URL path */
  src: string;
  /** Callback event for deleting the image */
  onDelete?(): void;
  /** Alt text of the image used for accessibility */
  altText?: string;
  /** Renders as skeleton */
  skeleton?: boolean;
}

function Item({
  src,
  onDelete,
  altText,
  skeleton,
}: InterfaceImageGalleryItem): JSX.Element {
  return (
    <div className="nimbus--image-gallery-item__wrapper">
      {skeleton ? (
        <div className="nimbus--image-gallery-skeleton" />
      ) : (
        <>
          <img src={src} alt={altText} className="nimbus--image-gallery-item" />
          <button
            aria-label="Delete image"
            type="button"
            onClick={onDelete}
            className="nimbus--image-gallery-item__delete"
          >
            <span className="nimbus--image-gallery-item__delete-button">
              <TrashIcon />
            </span>
          </button>
        </>
      )}
    </div>
  );
}

export default Item;
