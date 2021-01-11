import * as React from "react";
import classNames from "classnames";

import { CameraIcon, PlusCircleIcon } from "@tiendanube/icons";

import Item from "./ImageGallery.Item";

import "./ImageGallery.css";

import { Text } from "..";

export { InterfaceImageGalleryItem } from "./ImageGallery.Item";

export interface InterfaceImageGallery {
  /** Name of the input, also used for the id */
  name: string;
  /** Indicates if the component is at it's loading state */
  loading?: boolean;
  /** React node of type children */
  children?: React.ReactNode;
  /** Label text for the empty state */
  emptyLabel: string;
  /** Maximum number of items that can be loaded */
  maxItems?: number;
  /** Renders as skeleton */
  skeleton?: boolean;
  /** Callback event for adding new images */
  onAddImage(): void;
}

function ImageGallery({
  name,
  loading = false,
  children,
  emptyLabel,
  maxItems = 6,
  skeleton,
  onAddImage,
}: InterfaceImageGallery): JSX.Element {
  const id = `nimbus--input-${name}`;

  const renderSpinnerEmpty = loading ? (
    <div className="nimbus--image-gallery__spinner" />
  ) : (
    <>
      <CameraIcon size="large" />
      <Text bold appearance="secondary">
        {emptyLabel}
      </Text>
    </>
  );
  const renderSpinnerAdd = loading ? (
    <div className="nimbus--image-gallery__spinner" />
  ) : (
    <PlusCircleIcon size="large" />
  );

  const childrenCount = React.Children.count(children);

  const renderInputFile = (spinner: JSX.Element, className: string) => {
    const fileInputClassName = classNames(
      "nimbus--image-gallery__file-button",
      {
        "is--loading": loading,
      },
    );

    return (
      <div className={className}>
        <div className="nimbus--image-gallery-item">
          <label htmlFor={id} className={fileInputClassName}>
            <button
              name={id}
              aria-label={id}
              id={id}
              type="button"
              disabled={loading}
              onClick={onAddImage}
            />
            {spinner}
          </label>
        </div>
      </div>
    );
  };

  const renderSkeletonItem = (
    <div className="nimbus--image-gallery-item__wrapper">
      <div className="nimbus--image-gallery-item">
        <div className="nimbus--image-gallery-skeleton__wrapper">
          <div className="nimbus--image-gallery-skeleton" />
        </div>
      </div>
    </div>
  );
  const renderSkeleton = (
    <div className="nimbus--image-gallery__empty">
      <div className="nimbus--image-gallery-skeleton" />
    </div>
  );

  const renderChildren = (
    <div className="nimbus--image-gallery__row">
      {children}
      {skeleton
        ? renderSkeletonItem
        : childrenCount < maxItems &&
          renderInputFile(
            renderSpinnerAdd,
            "nimbus--image-gallery-item__wrapper",
          )}
    </div>
  );
  const renderEmpty = skeleton
    ? renderSkeleton
    : renderInputFile(renderSpinnerEmpty, "nimbus--image-gallery__empty");

  return (
    <div className="nimbus--image-gallery__wrapper">
      {childrenCount ? renderChildren : renderEmpty}
    </div>
  );
}

ImageGallery.Item = Item;

export default ImageGallery;
