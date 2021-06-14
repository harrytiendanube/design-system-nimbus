import * as React from "react";
import { PlusCircleIcon } from "@tiendanube/icons";

import ThumbnailButton, { InterfaceThumbnailButton } from "./Thumbnail.Button";

import "./Thumbnail.css";

export interface InterfaceThumbnailFile
  extends Omit<InterfaceThumbnailButton, "children" | "className" | "onClick"> {
  /** Accept file types */
  accept?: string;
  /** Open file chooser */
  open?: boolean;
  /** OnChange callback */
  onChange: (files: File[]) => void;
}

function File({
  aspectRatio,
  width,
  disabled = false,
  ariaLabel,
  accept = "image/jpeg,image/gif,image/png",
  open = false,
  onChange,
}: InterfaceThumbnailFile): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleOnClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const files = event.target.files && Object.values(event.target.files);
    if (files) {
      onChange(files);
    }
  };

  React.useEffect(() => {
    if (open) inputRef.current?.click();
  }, [open]);

  return (
    <ThumbnailButton
      aspectRatio={aspectRatio}
      width={width}
      ariaLabel={ariaLabel}
      onClick={handleOnClick}
      disabled={disabled}
      className="nimbus--thumbnail-button-add"
    >
      <PlusCircleIcon size="large" />
      <input
        className="nimbus--thumbnail-file"
        ref={inputRef}
        type="file"
        accept={accept}
        id="thumbnail-file"
        name="thumbnail-file"
        multiple
        onChange={handleChange}
      />
    </ThumbnailButton>
  );
}

export default File;
