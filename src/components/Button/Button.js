import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

/**
  Utiliza `Button` como componente de acción.
*/
const Button = props => {
  const { start, children, end, className, color, outline } = props;

  return (
    <button {...props} className={`${className} button_${color}${ outline ? '_outline' : '' }`}>
      { start }
      { children }
      { end }
    </button>
  );
};

Button.defaultProps = {
  className: "",
  color: "primary",
  outline: false
};

Button.propTypes = {
  /**
    Escribe dentro de las las etiquetas para renderizar el contenido.
  */
  children: PropTypes.node.isRequired,
  /**
   * Cambia el estilo del componente
   */
  className: PropTypes.string,
  /**
   * Colores "primary", "secondary", "Light", "Danger", "Transparent"
   */
  color: PropTypes.oneOf(["primary", "secondary", "light", "danger", "transparent"]),
  /**
   * Icono al comienzo del botón
   */
  start: PropTypes.node,
  /**
   * Icono al final del botón
   */
  end: PropTypes.node,
  /**
   * Fondo transparente con borde de color.
   */
  outline: PropTypes.bool,
  
};

export default Button;