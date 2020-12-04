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
      <div className="nimbus--image-gallery-item">
        {skeleton ? (
          <div className="nimbus--image-gallery-skeleton__wrapper">
            <div className="nimbus--image-gallery-skeleton" />
          </div>
        ) : (
          <>
            <img
              src={src}
              alt={altText}
              className="nimbus--image-gallery-item__image"
            />
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
    </div>
  );
}

export default Item;
