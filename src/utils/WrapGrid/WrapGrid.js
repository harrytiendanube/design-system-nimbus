import React, { useState } from "react";

import "./WrapGrid.css";
import Icon from "../../components/Icon/Icon";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

const Icons = { ...fal, ...fab };

const iconNames = Object.keys(Icons).map((icon) =>
  icon.substring(2).toLowerCase()
);

function IconList({ icons, filtered }) {
  return (
    <div className={`grid`}>
      {icons.map((icon) => {
        return (
          <div className="wrapgrid_icon-block" key={icon}>
            <h3>{icon}</h3>
            <Icon icon={`${icon}`} size="2x" />
          </div>
        );
      })}
    </div>
  );
}

const WrapGrid = (props) => {
  const [filter, setFilter] = useState("");
  const handleOnChange = ({ target: { value } }) => {
    setFilter(value);
  };
  const foo = iconNames.map((iconName) => iconName);
  console.log(foo);
  return (
    <div class="wrapgrid">
      <div>
        <input
          type="text"
          class="filter"
          value={filter}
          placeholder="Buscador"
          onChange={handleOnChange}
        />
      </div>
      <IconList icons={iconNames} />
    </div>
  );
};

WrapGrid.defaultProps = {
  className: "",
};

WrapGrid.propTypes = {};

export default WrapGrid;
