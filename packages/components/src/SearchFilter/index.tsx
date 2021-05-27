import * as React from "react";

import "./SearchFilter.css";

import { SlidersIcon } from "@tiendanube/icons";
import { InterfaceNameValue, InterfaceIdLabel } from "../common/interfaces";
import Button from "../Button";
import Input from "../Input";
import Text from "../Text";
import Chip from "../Chip";

export interface InterfaceSearchFilter {
  /** Placeholder text for the search input */
  placeholder: string;
  /** Label text for filter button */
  label?: string;
  /** Number of filters applied for button badge */
  filterCount?: number;
  /** Aria-label text for filter button */
  ariaLabel?: string;
  /** Number of results to show */
  resultCount?: string;
  /** Applied filters visible */
  appliedFilters?: InterfaceIdLabel[];
  /** Callback on submitting search */
  onSubmit(value: string): void;
  /** Callback on dismissing chip */
  onDismiss(id: string): void;
  /** Callback on filter button. If not provided, button will not be rendered */
  onClick?(): void;
}

function SearchFilter({
  placeholder,
  label: labelButton,
  filterCount,
  ariaLabel,
  resultCount,
  appliedFilters,
  onSubmit,
  onDismiss,
  onClick,
}: InterfaceSearchFilter): JSX.Element {
  const [searchValue, setSearchValue] = React.useState("");
  const [isFocused, setFocused] = React.useState(false);

  const handleBlur = () => {
    setFocused(false);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = ({ value }: InterfaceNameValue) => {
    setSearchValue(value);
  };

  const handleSubmit = ({ value }: InterfaceNameValue) => {
    if (value) onSubmit(value);
    setSearchValue("");
    setFocused(false);
  };

  const handleDismiss = (id: string) => {
    onDismiss(id);
  };

  const renderFiltersButton = onClick && (
    <div className="nimbus--search-filters__filters">
      <Button
        badge={filterCount}
        ariaLabel={ariaLabel || labelButton}
        appearance="default"
        icon={SlidersIcon}
        onClick={onClick}
      >
        {labelButton}
      </Button>
    </div>
  );

  const renderFilters = appliedFilters?.map(({ id, label }) => (
    <Chip key={id} id={id} label={label} onDismiss={handleDismiss} />
  ));

  return (
    <div className="nimbus--search-filters__wrapper">
      <div className="nimbus--search-filters">
        <div className="nimbus--search-filters__search">
          <Input
            name="search"
            type="search"
            value={searchValue}
            focused={isFocused}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
          />
        </div>
        {renderFiltersButton}
      </div>
      <div className="nimbus--search-filters__results">
        {resultCount && <Text>{resultCount}</Text>}
        {renderFilters}
      </div>
    </div>
  );
}

export default SearchFilter;
