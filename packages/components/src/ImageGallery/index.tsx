import * as React from "react";
import classNames from "classnames";

import { CameraIcon, PlusCircleIcon } from "@tiendanube/icons";
import { InterfaceFileUpload } from "../common/interfaces";
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
  onAddImage?(file: InterfaceFileUpload): void;
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
  const [value, setValue] = React.useState("");

  const convertBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleClick = () => {
    setValue("");
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target.files && event.target.files[0]) as Blob;
    if (file) {
      const base64 = (await convertBase64(file)) as string;
      // eslint-disable-next-line no-shadow
      const { name, size, type } = (file as unknown) as InterfaceFileUpload;
      onAddImage?.({ name, size, type, base64 });
    }
  };

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
    const id = `nimbus--input-${name}`;

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
            <input
              type="file"
              id={id}
              value={value}
              accept="image/*"
              disabled={loading}
              onClick={handleClick}
              onChange={handleChange}
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
