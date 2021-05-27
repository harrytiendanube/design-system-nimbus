import * as React from "react";
import { CheckIcon } from "@tiendanube/icons";

import Thumbnail, { InterfaceThumbnail } from "./Thumbnail";

import "./Thumbnail.css";

export interface InterfaceThumbnailSelect
  extends Omit<InterfaceThumbnail, "children" | "loading"> {
  /** Id to associate the select input with it's corresponding checkbox. */
  id: string;
  /** Callback for the select input */
  selected: boolean;
  /** Callback for the select input */
  onSelect: (id: string) => void;
}

function Select({
  src,
  altText,
  aspectRatio,
  width,
  selected,
  id,
  onSelect,
}: InterfaceThumbnailSelect): JSX.Element {
  const handleOnChange = () => onSelect(id);
  return (
    <Thumbnail
      aspectRatio={aspectRatio}
      width={width}
      src={src}
      altText={altText}
    >
      <label htmlFor={id} className="nimbus--thumbnail-select-wrapper">
        <input
          onChange={handleOnChange}
          className="nimbus--thumbnail-select"
          id={id}
          type="checkbox"
          checked={selected}
        />
        <div className="nimbus--thumbnail-select__label">
          <div className="nimbus--thumbnail-select__check">
            <CheckIcon />
          </div>
        </div>
      </label>
    </Thumbnail>
  );
}

export default Select;
