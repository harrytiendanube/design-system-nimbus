import React from 'react';
import PropTypes from "prop-types";
/* import './Icon.scss'; */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/pro-light-svg-icons';

const Icon = (props) => {
  return(
    <FontAwesomeIcon {...props} className={`button ${props.className}`} icon={Icons[ props.icon ]} />
  );
};

Icon.defaultProps = {
  className: ""
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;