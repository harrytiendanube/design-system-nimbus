import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import "./Title.scss";

/**
  Utiliza `Title` como componente de acción.
*/
const Title = ({ className, children, ...defaultProps }) => {
  return (
    <h1 {...defaultProps} className={`nimbus--title ${className}`}>
      {children}
    </h1>
  );
};

Title.defaultProps = {
  className: "",
};

Title.propTypes = {
  /**
    Escribe dentro de las las etiquetas para renderizar el contenido.
  */
  children: PropTypes.node.isRequired,
};

export default Title;
