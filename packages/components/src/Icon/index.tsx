import React from 'react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
export const icons = { ...fab, ...fal };

export const variantIcons = Object.keys(icons).map(icon => icon.substring(2));

type Props = {
  name: string;
  className: string;
  size?: SizeProp;
  color?: string;
};

/*
 *   example icon to use icons["fa" + "Accusoft"]
 *   ${param} name : string in Capitalized
 */

const Icon = ({ name, className, size, color }: Props) => {
  return (
    <FontAwesomeIcon
      className={`icon ${className}`}
      icon={icons[`fa${name}`]}
      size={size}
      color={color}
      data-testid={`icon-${name}`}
    />
  );
};

// Icon.propTypes = {
//   /**
//    * Icon classeName's
//    */
//   className: PropTypes.string,
//   /**
//    * Icon name's
//    */
//   name: PropTypes.string.isRequired,
//   /**
//    * Icon sizes's
//    */
//   size: PropTypes.string,
//   /**
//    * Icon color's
//    */
//   color: PropTypes.string
// }

export default Icon;
