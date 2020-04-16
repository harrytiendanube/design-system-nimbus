import React from "react";

import "./WrapGrid.css";
import Icon from "../../components/Icon/Icon";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

const WrapGrid = (props) => {
  const Icons = { ...fal, ...fab };
  return (
    <div {...props} className={`wrapgrid ${props.className}`}>
      {Object.keys(Icons).map((i) => {
        const internalIconName = i.substring(2);
        return (
          <div className="wrapgrid_icon-block">
            <h3>{internalIconName}</h3>
            <Icon icon={internalIconName} size="2x" />
          </div>
        );
      })}
    </div>
  );
};

WrapGrid.defaultProps = {
  className: "",
};

WrapGrid.propTypes = {};

export default WrapGrid;
