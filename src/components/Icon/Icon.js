import React from "react";
import PropTypes from "prop-types";
/* import './Icon.scss'; */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/pro-light-svg-icons";

const Icon = props => {
  return (
    <FontAwesomeIcon
      {...props}
      className={`button ${props.className}`}
      icon={Icons[props.icon]}
      size={props.size}
      color= { props.color }
    />
  );
};

Icon.defaultProps = {
  className: "",
  size: "1x",
  color: "#2C3357"
};

Icon.propTypes = {
  /**
   * Nombre del icono
   */
  icon: PropTypes.string.isRequired,
  /**
   * Tamaño del icono
   */
  size: PropTypes.string,
  color: PropTypes.string
};

export default Icon;
