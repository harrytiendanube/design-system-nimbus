import React from "react";
import PropTypes from "prop-types";

import '../reset.css';
import "./Button.scss";

/**
  Utiliza `Button` como componente de acción.
*/
const Button = props => {
  console.log(props.left)
  return (
    <button {...props} className={`button ${props.className} ${props.color}`}>
      { props.start }
      { props.children }
      { props.end && props.end }
    </button>
  );
};

Button.defaultProps = {
  className: "",
  color: "primary"
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
  
};

export default Button;