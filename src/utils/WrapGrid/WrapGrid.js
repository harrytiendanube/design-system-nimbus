import React, { useState } from "react";
import PropTypes from "prop-types";
import "./WrapGrid.css";

import { Icon, icons, variantIcons } from "../../components";

function IconList({ iconList }) {
  return (
    <div className={`grid`}>
      {iconList &&
        iconList.map((name) => {
          return (
            <div className="wrapgrid_icon-block" key={name}>
              <h3>{name}</h3>
              <Icon name={name} size="2x" />
            </div>
          );
        })}
    </div>
  );
}

IconList.propTypes = {
  iconList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const WrapGrid = () => {
  /*
   * ${filter}params of value input
   * ${setFilter}method change filter
   */
  const [filter, setFilter] = useState("");

  const handleOnChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const iconsListFiltered = variantIcons.filter((icon) =>
    icon.toLowerCase().includes(filter.toLowerCase())
  );

  const arrayListIcons =
    filter && filter.length ? iconsListFiltered : variantIcons;

  return (
    <div className="wrapgrid">
      <input
        type="text"
        className="filter"
        value={filter}
        placeholder="Buscador"
        onChange={handleOnChange}
        data-testid="icon-search"
      />

      <IconList iconList={arrayListIcons} />
    </div>
  );
};

WrapGrid.defaultProps = {
  className: "",
};

WrapGrid.propTypes = {};

export default WrapGrid;
