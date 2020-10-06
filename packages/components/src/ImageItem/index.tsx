import * as React from "react";

import "./ImageItem.css";

import { CameraIcon } from "@tiendanube/icons";
import Link from "../Link";
import Text from "../Text";

export interface InterfaceImageItem {
  /** Image thumbnail */
  thumbnail?: string;
  /** Link to display in the ImageItem */
  link: string;
  /** Link Href */
  linkTo: string;
  /** Subtitle for the ImageItem */
  subtitle?: string;
  /** Description for the ImageItem */
  description?: string;
}
/**
 * @param thumbnail Image thumbnail
 * @param link Link to display in the ImageItem
 * @param linkTo Link Href
 * @param subtitle Subtitle for the ImageItem
 * @param description Description for the ImageItem
 */
const ImageItem = React.memo(function ImageItem({
  thumbnail,
  link,
  linkTo,
  subtitle,
  description,
}: InterfaceImageItem): JSX.Element {
  const [errorLoad, setErrorLoad] = React.useState(false);
  const handleError = React.useCallback(() => setErrorLoad(true), []);
  const memorizedThumbnail = React.useMemo(() => {
    return thumbnail && !errorLoad ? (
      <img src={thumbnail} alt={link} onError={handleError} />
    ) : (
      <div className="nimbus--image-item__placeholder">
        <CameraIcon size="large" />
      </div>
    );
  }, [thumbnail, errorLoad, link, handleError]);
  const memorizedSubtitle = React.useMemo(
    () => subtitle && <Text>{subtitle}</Text>,
    [subtitle],
  );
  const memorizedDescription = React.useMemo(
    () => description && <Text>{description}</Text>,
    [description],
  );
  return (
    <div className="nimbus--image-item" role="listitem">
      <div className="nimbus--image-item__thumbnail" aria-label={link}>
        {memorizedThumbnail}
      </div>
      <div className="nimbus--image-item__info">
        <Link href={linkTo} target="_self">
          {link}
        </Link>
        {memorizedSubtitle}
        {memorizedDescription}
      </div>
    </div>
  );
}) as React.NamedExoticComponent<InterfaceImageItem> & {
  Skeleton: typeof Skeleton;
};

const Skeleton = () => (
  <div className="nimbus--image-item-skeleton">
    <div className="nimbus--image-item-skeleton__thumbnail" />
    <div className="nimbus--image-item-skeleton__info">
      <div className="nimbus--image-item-skeleton__info-item" />
      <div className="nimbus--image-item-skeleton__info-item" />
      <div className="nimbus--image-item-skeleton__info-item" />
    </div>
  </div>
);

ImageItem.Skeleton = Skeleton;

export default ImageItem;
