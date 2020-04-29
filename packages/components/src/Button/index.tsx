import React, { FunctionComponent } from 'react';
import Icon from '../Icon/';
import './Button.scss';

/**
  Utiliza `Button` como componente de acción.
*/

enum Color {
  primary = 'primary',
  secondary = 'secondary',
  light = 'light',
  danger = 'danger',
  transparent = 'transparent',
}

interface Props {
  start: string;
  end: string;
  className: string;
  color: Color;
  outline: boolean;
}

const Button: FunctionComponent<Props> = ({
  start,
  children,
  end,
  className,
  color,
  outline,
}) => {
  return (
    <button
      className={`${className} nimbus--button_${color}${
        outline ? '_outline' : ''
      }`}
    >
      {start && <Icon name={start} className="button_start" />}
      {children}
      {end && <Icon name={end} className="button_end" />}
    </button>
  );
};

// Button.defaultProps = {
//   className: '',
//   color: 'primary',
//   outline: false
// }

// Button.propTypes = {
//   /**
//     Escribe dentro de las las etiquetas para renderizar el contenido.
//   */
//   children: PropTypes.node.isRequired,
//   /**
//    * Cambia el estilo del componente
//    */
//   className: PropTypes.string,
//   /**
//    * Colores "primary", "secondary", "Light", "Danger", "Transparent"
//    */
//   color: PropTypes.oneOf([
//     'primary',
//     'secondary',
//     'light',
//     'danger',
//     'transparent'
//   ]),
//   /**
//    * Nombre del Icono que mostrará al comienzo del botón.
//    */
//   start: PropTypes.string,
//   /**
//    * Nombre del Icono que mostrará al final del botón.
//    */
//   end: PropTypes.string,
//   /**
//    * Fondo transparente con borde de color.
//    */
//   outline: PropTypes.bool
// }

export default Button;
