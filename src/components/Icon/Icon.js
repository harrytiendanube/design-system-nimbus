import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

const Icon = (props) => {
  const Icons = { ...fal, ...fab };
  return (
    <FontAwesomeIcon
      {...props}
      className={`button ${props.className}`}
      icon={
        Icons["fa" + props.icon.charAt(0).toUpperCase() + props.icon.slice(1)]
      }
      size={props.size}
      color={props.color}
    />
  );
};

Icon.defaultProps = {
  className: "",
  size: "1x",
  color: "#2C3357",
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
  color: PropTypes.string,
};

export default Icon;
