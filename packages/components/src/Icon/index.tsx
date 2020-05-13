import React from 'react'
import {
  FontAwesomeIcon,
  Props as FAProps
} from '@fortawesome/react-fontawesome'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
export const icons = { ...fal, ...fab }

export const variantIcons = Object.keys(icons).map((icon) => icon.substring(2))

const DEFAULT_COLOR = 'inherit'
const DEFAULT_SIZE = 'sm'

interface Props {
  /**
   * Icon name's
   */
  name: FAProps['name']
  /**
   * Icon sizes's
   */
  size?: FAProps['size']
  /**
   * Icon color's
   */
  color?: FAProps['color']
}

/*
 *   example icon to use icons["fa" + "Accusoft"]
 *   ${param} name : string in Capitalized
 */

const Icon: React.FC<Props> = ({
  name,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR
}: Props) => {
  return (
    <FontAwesomeIcon
      icon={icons[`fa${name}`]}
      size={size}
      color={color}
      data-testid={`icon-${name}`}
    />
  )
}

export default Icon
