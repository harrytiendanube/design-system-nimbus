import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import "./Text.scss";

/**
  Utiliza `Text` como componente de acción.
*/
const Text = ({ className, children, size, ...defaultProps }) => {
  return (
    <p
      {...defaultProps}
      className={`nimbus--text ${className} nimbus--text_${size}`}
    >
      {children}
    </p>
  );
};

Text.defaultProps = {
  className: "",
  size: "regular",
};

Text.propTypes = {
  /**
    Escribe dentro de las las etiquetas para renderizar el contenido.
  */
  children: PropTypes.node.isRequired,
  /**
   * Tamaño de tipografía
   */
  size: PropTypes.oneOf(["small", "regular"]),
};

export default Text;
