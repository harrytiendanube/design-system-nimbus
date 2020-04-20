import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import "./Link.scss";

/**
  Utiliza `Label` como componente de acción.
*/
const Link = ({
  start,
  children,
  end,
  className,
  color,
  onClick,
  ...defaultProps
}) => {
  const handleLink = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <a
      {...defaultProps}
      className={`link ${className} link_${color}`}
      onClick={handleLink}
    >
      {start && <Icon name={start} className="link_start" />}
      {children}
      {end && <Icon name={end} className="link_end" />}
    </a>
  );
};

Link.defaultProps = {
  className: "",
  color: "primary",
};

Link.propTypes = {
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
   * Callback del evento click
   */
  onClick: PropTypes.func.isRequired,
};

export default Link;
