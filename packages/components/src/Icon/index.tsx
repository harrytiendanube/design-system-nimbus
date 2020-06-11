import * as React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import "@tiendanube/styles/css/Icon.css";

export const icons = { ...fal, ...fab };
export const variantIcons = Object.keys(icons).map((icon) => icon.substring(2));

export interface InterfaceIcon {
  /**
   * Icons's name  (Show available names in gallery)
   */
  name: string;
  /**
   * Available Sizes: "sm" | "xs" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x"
   */
  size?:
    | "xs"
    | "lg"
    | "sm"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  /**
   * Color type of string, to be define color of hexadecimal or rbg properties
   */
  color?: string;
  /**
   * Add start space to icon
   */
  startPadding?: boolean;
  /**
   * Add end space to icon
   */
  endPadding?: boolean;
}

/**
 *   Tiendanube Icon
 *   @Param name Icons's name  (Show available names in gallery)
 *   @Param color Color type of string, defined color of hexadecimal or rbg
 *   @Param size Available Sizes: "sm" | "xs" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x"
 *   @Param startPadding used size in abbreviations "sm"
 *   @Param endPadding used size in abbreviations "sm"
 */

function Icon({
  name,
  size = "sm",
  color = "inherit",
  startPadding = false,
  endPadding = false,
}: InterfaceIcon): JSX.Element {
  const className = React.useMemo(
    () =>
      `${startPadding ? "icon__padding_start" : ""} ${
        endPadding ? "icon__padding_end" : ""
      }`,
    [startPadding, endPadding],
  );

  const iconName = React.useMemo(() => icons[`fa${name}`], [name]);

  return (
    <FontAwesomeIcon
      className={className}
      icon={iconName}
      size={size}
      color={color}
      data-testid={`icon-${name}`}
    />
  );
}

export default React.memo(Icon) as typeof Icon;
