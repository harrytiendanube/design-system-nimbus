import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

/**
  Utiliza `Button` como componente de acción.
*/
const Button = (props) => {
  return (
    <button {...props} className={`button ${props.className}`}>
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  className: "",
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
};

export default Button;
