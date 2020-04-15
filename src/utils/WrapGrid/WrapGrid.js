import React from "react";
import PropTypes from "prop-types";

import "./WrapGrid.css";
import Icon from "../../components/Icon/Icon";
import * as Icons from "@fortawesome/pro-light-svg-icons";

const WrapGrid = (props) => {
  return (
    <div {...props} className={`wrapgrid ${props.className}`}>
      {Object.keys(Icons).map(i => {
        return (
          <div className="wrapgrid_icon-block">
            <h3>{ i }</h3>
            <Icon icon={ i } size="2x" />
          </div>
        );
      })}
    </div>
  );
};

WrapGrid.defaultProps = {
  className: ""
};

WrapGrid.propTypes = {};

export default WrapGrid;
