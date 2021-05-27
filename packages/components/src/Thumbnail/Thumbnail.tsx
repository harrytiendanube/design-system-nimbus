import * as React from "react";

import Skeleton from "./Thumbnail.Skeleton";
import Add from "./Thumbnail.Add";
import Empty from "./Thumbnail.Empty";
import Select from "./Thumbnail.Select";
import Plus from "./Thumbnail.Plus";

import Wrapper, { InterfaceThumbnailWrapper } from "./Thumbnail.Wrapper";
import { Spinner } from "../Spinner";

import "./Thumbnail.css";

export { InterfaceThumbnailAdd } from "./Thumbnail.Add";
export { InterfaceThumbnailEmpty } from "./Thumbnail.Empty";
export { InterfaceThumbnailPlus } from "./Thumbnail.Plus";
export { InterfaceThumbnailSelect } from "./Thumbnail.Select";

export interface InterfaceThumbnail
  extends Omit<InterfaceThumbnailWrapper, "children"> {
  /** React node of type children */
  children?: React.ReactNode;
  /** URL source for the image */
  src: string;
  /** Alternative text for the image */
  altText: string;
  /** Loading state of the image. Renders a spinner over the thumbnail */
  loading?: boolean;
}

function Thumbnail({
  children,
  src,
  altText,
  aspectRatio,
  width,
  loading = false,
}: InterfaceThumbnail): JSX.Element {
  return (
    <Wrapper aspectRatio={aspectRatio} width={width}>
      <>
        {children}
        {loading && (
          <div className="nimbus--thumbnail-overlay nimbus--thumbnail-overlay--white">
            <Spinner size="large" />
          </div>
        )}
        <img src={src} alt={altText} className="nimbus--thumbnail" />
      </>
    </Wrapper>
  );
}

Thumbnail.Skeleton = Skeleton;
Thumbnail.Add = Add;
Thumbnail.Plus = Plus;
Thumbnail.Empty = Empty;
Thumbnail.Select = Select;

export default Thumbnail;
