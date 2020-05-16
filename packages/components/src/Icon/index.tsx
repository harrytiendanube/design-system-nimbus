import * as React from "react";
import "@tiendanube/styles/css/Icon.css";

import {
  FontAwesomeIcon,
  Props as FAProps,
} from "@fortawesome/react-fontawesome";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
export const icons = { ...fal, ...fab };

export const variantIcons = Object.keys(icons).map((icon) => icon.substring(2));

const DEFAULT_SIZE = "sm";
const DEFAULT_COLOR = "inherit";

interface Props {
  /**
   * Nombre del icono (ver Galería valores permitidos)
   */
  name: string;
  /**
   * Tamaño: "sm" | "xs" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x"
   */
  size?: FAProps["size"];
  /**
   * Color
   */
  color?: FAProps["color"];
  /**
   * Add start space to icon
   */
  startPadding?: boolean;
  /**
   * Add end space to icon
   */
  endPadding?: boolean;
  /**
   * Add start space to icon
   */
  startMargin?: boolean;
  /**
   * Add end space to icon
   */
  endMargin?: boolean;
}

/*
 *   example icon to use icons["fa" + "Accusoft"]
 *   ${param} name : string in Capitalized
 */

const Icon: React.FC<Props> = ({
  name,
  size,
  color,
  startPadding,
  endPadding,
  startMargin,
  endMargin,
}: Props) => {
  return (
    <FontAwesomeIcon
      className={`${startPadding ? "icon__padding_start" : ""} ${
        endPadding ? "icon__padding_end" : ""
      } ${startMargin ? "icon__margin_start" : ""} ${
        endMargin ? "icon__margin_end" : ""
      }`}
      icon={icons[`fa${name}`]}
      size={size}
      color={color}
      data-testid={`icon-${name}`}
    />
  );
};

Icon.defaultProps = {
  size: DEFAULT_SIZE,
  color: DEFAULT_COLOR,
  startPadding: false,
  endPadding: false,
  startMargin: false,
  endMargin: false,
};

export default Icon;
