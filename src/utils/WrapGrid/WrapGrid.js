import React, { useState } from "react";

import "./WrapGrid.css";
import Icon from "../../components/Icon/Icon";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

const WrapGrid = (props) => {
  const Icons = { ...fal, ...fab };
  const [filter, setFilter] = useState("");
  return (
    <div class="wrapgrid">
      <div>
        <input
          type="text"
          class="filter"
          value={filter}
          placeholder="Buscador"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <div {...props} className={`grid ${props.className}`}>
        {Object.keys(Icons)
          .filter((i) =>
            i
              .substring(2)
              .toLowerCase()
              .startsWith(filter.toLowerCase())
          )
          .map((i) => {
            const internalIconName = i.substring(2);
            return (
              <div className="wrapgrid_icon-block" key={i}>
                <h3>{internalIconName}</h3>
                <Icon icon={i.substring(2)} size="2x" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

WrapGrid.defaultProps = {
  className: "",
};

WrapGrid.propTypes = {};

export default WrapGrid;
