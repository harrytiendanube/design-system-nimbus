import * as React from "react";

import "./ImageItem.css";

import { CameraIcon } from "@tiendanube/icons";
import Link, { InterfaceLink } from "../Link";
import Text, { InterfaceText } from "../Text";

export interface InterfaceImageItem {
  /** Image thumbnail */
  thumbnail?: string;
  /** Link to display in the ImageItem */
  link: Pick<InterfaceLink, "children" | "onClick">;
  /** Subtitle for the ImageItem */
  subtitle?: Pick<InterfaceText, "children" | "appearance">;
  /** Description for the ImageItem */
  description?: Pick<InterfaceText, "children" | "appearance">;
}
function ImageItem({
  thumbnail,
  link,
  subtitle,
  description,
}: InterfaceImageItem): JSX.Element {
  const [errorLoad, setErrorLoad] = React.useState(false);
  const handleError = React.useCallback(() => setErrorLoad(true), []);
  const renderThumbnail =
    thumbnail && !errorLoad ? (
      <img
        src={thumbnail}
        alt={link.children as string}
        onError={handleError}
      />
    ) : (
      <div className="nimbus--image-item__placeholder">
        <CameraIcon size="large" />
      </div>
    );

  const renderSubtitle = subtitle && (
    <Text appearance={subtitle.appearance}>{subtitle.children}</Text>
  );

  const renderDescription = description && (
    <Text appearance={description.appearance}>{description.children}</Text>
  );

  return (
    <div className="nimbus--image-item" role="listitem">
      <div
        className="nimbus--image-item__thumbnail"
        aria-label={link.children as string}
      >
        {renderThumbnail}
      </div>
      <div className="nimbus--image-item__info">
        <Link appearance="primary" onClick={link.onClick}>
          {link.children}
        </Link>
        {renderSubtitle}
        {renderDescription}
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="nimbus--image-item-skeleton">
    <div className="nimbus--image-item-skeleton__thumbnail" />
    <div className="nimbus--image-item-skeleton__info">
      <Text.Skeleton width="large" />
      <Text.Skeleton width="medium" />
      <Text.Skeleton width="small" />
    </div>
  </div>
);

ImageItem.Skeleton = Skeleton;

export default ImageItem;
