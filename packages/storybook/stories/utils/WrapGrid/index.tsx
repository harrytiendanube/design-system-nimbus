import * as React from "react";

import "./WrapGrid.css";

import { Icon, variantIcons } from "../../../../components/src";

type Props = { iconList: Array<string> };

const IconList: React.FC<Props> = ({ iconList }: Props) => {
  return (
    <div className="grid">
      {iconList &&
        iconList.map((name: string) => {
          return (
            <div className="wrapgrid_icon-block" key={name}>
              <h3>{name}</h3>
              <Icon name={name} size="2x" />
            </div>
          );
        })}
    </div>
  );
};

type Prop = {};
const WrapGrid: React.FC<Prop> = () => {
  const [filter, setFilter] = React.useState("");

  const iconsListFiltered = variantIcons.filter((icon) =>
    icon.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleOnChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setFilter(event.target.value);
    },
    [setFilter],
  );

  const arrayListIcons =
    filter && filter.length ? iconsListFiltered : variantIcons;

  return (
    <div className="wrapgrid">
      <input
        type="text"
        className="filter"
        value={filter}
        placeholder="Search"
        onChange={handleOnChange}
        data-testid="icon-search"
      />

      <IconList iconList={arrayListIcons} />
    </div>
  );
};

export default WrapGrid;
