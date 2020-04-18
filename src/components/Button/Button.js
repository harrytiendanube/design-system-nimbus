import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import "./Button.scss";

/**
  Utiliza `Button` como componente de acción.
*/
const Button = ({
  start,
  children,
  end,
  className,
  color,
  outline,
  ...defaultProps
}) => {
  return (
    <button
      {...defaultProps}
      className={`${className} button_${color}${outline ? "_outline" : ""}`}
    >
      {start && <Icon name={start} />}
      {children}
      {end && <Icon name={end} />}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  color: "primary",
  outline: false,
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
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "light",
    "danger",
    "transparent",
  ]),
  /**
   * Nombre del Icono que mostrará al comienzo del botón.
   */
  start: PropTypes.string,
  /**
   * Nombre del Icono que mostrará al final del botón.
   */
  end: PropTypes.string,
  /**
   * Fondo transparente con borde de color.
   */
  outline: PropTypes.bool,
};

export default Button;
