import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
export const icons = { ...fal, ...fab };

export const variantIcons = Object.keys(icons).map((icon) => icon.substring(2));

const DEFAULT_COLOR = "inherit";
const DEFAULT_SIZE = "sm";

/*
 *   example icon to use icons["fa" + "Accusoft"]
 *   ${param} name : string in Capitalized
 */

const Icon = ({ name, className, size, color, ...defaultProps }) => {
  return (
    <FontAwesomeIcon
      {...defaultProps}
      className={`icon ${className}`}
      icon={icons[`fa${name}`]}
      size={size}
      color={color}
      data-testid={`icon-${name}`}
    />
  );
};

Icon.propTypes = {
  /**
   * Icon classeName's
   */
  className: PropTypes.string,
  /**
   * Icon name's
   */
  name: PropTypes.string.isRequired,
  /**
   * Icon sizes's
   */
  size: PropTypes.string,
  /**
   * Icon color's
   */
  color: PropTypes.string,
};

Icon.defaultProps = {
  className: "",
  size: DEFAULT_SIZE,
  color: DEFAULT_COLOR,
};

export default Icon;
