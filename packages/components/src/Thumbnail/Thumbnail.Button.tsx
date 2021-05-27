import * as React from "react";

import Wrapper, { InterfaceThumbnailWrapper } from "./Thumbnail.Wrapper";

import "./Thumbnail.css";

export interface InterfaceThumbnailButton
  extends Omit<InterfaceThumbnailWrapper, "children"> {
  /** React node of type children */
  children?: React.ReactNode;
  /** Classname for the button */
  className?: string;
  /** Text label of the add button. Used for accessibility */
  ariaLabel: string;
  /** Determines if the add new images button is disabled */
  disabled?: boolean;
  /** Callback for input */
  onClick: () => void;
}

function Button({
  children,
  className,
  aspectRatio,
  width,
  ariaLabel,
  disabled,
  onClick,
}: InterfaceThumbnailButton): JSX.Element {
  return (
    <Wrapper aspectRatio={aspectRatio} width={width}>
      <button
        aria-label={ariaLabel}
        title={ariaLabel}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </button>
    </Wrapper>
  );
}

export default Button;
