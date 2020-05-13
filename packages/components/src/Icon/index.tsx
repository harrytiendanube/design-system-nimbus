import * as React from 'react'
import {
  FontAwesomeIcon,
  Props as FAProps
} from '@fortawesome/react-fontawesome'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
export const icons = { ...fal, ...fab }

export const variantIcons = Object.keys(icons).map((icon) => icon.substring(2))

const DEFAULT_SIZE = 'sm'
const DEFAULT_COLOR = 'inherit'

interface Props {
  /**
   * Cambia el estilo del componente
   */
  className?: string
  /**
   * Nombre del icono (ver Galería valores permitidos)
   */
  name: string
  /**
   * Tamaño: "sm" | "xs" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x"
   */
  size?: FAProps['size']
  /**
   * Color
   */
  color?: FAProps['color']
}

/*
 *   example icon to use icons["fa" + "Accusoft"]
 *   ${param} name : string in Capitalized
 */

const Icon: React.FC<Props> = ({
  className = '',
  name,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR
}: Props) => {
  return (
    <FontAwesomeIcon
      className={className}
      icon={icons[`fa${name}`]}
      size={size}
      color={color}
      data-testid={`icon-${name}`}
    />
  )
}

export default Icon
