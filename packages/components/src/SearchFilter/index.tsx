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
  /** Label text for the button */
  label: string;
  /** Number of results to show */
  resultCount: string;
  /** Applied filters visible */
  appliedFilters?: InterfaceIdLabel[];
  /** Callback on submitting search */
  onSubmit(value: string): void;
  /** Callback on dismissing chip */
  onDismiss(id: string): void;
  /** Callback for the filter button */
  onClick(): void;
}

/**
 * @param placeholder Placeholder text for the search input
 * @param label Label text for the button
 * @param resultCount Number of results to show
 * @param appliedFilters Applied filters visible
 * @param onSubmit Callback on submitting search
 * @param onDismiss Callback on dismissing chip
 * @param onClick Callback for the filter button
 */
function SearchFilter({
  placeholder,
  label: labelButton,
  resultCount,
  appliedFilters,
  onSubmit,
  onDismiss,
  onClick,
}: InterfaceSearchFilter): JSX.Element {
  const [searchValue, setSearchValue] = React.useState("");
  const [isFocused, setFocused] = React.useState(false);

  const handleBlur = React.useCallback(() => {
    if (isFocused) setFocused(false);
  }, [isFocused]);

  const handleFocus = React.useCallback(() => {
    if (!isFocused) setFocused(true);
  }, [isFocused]);

  const handleChange = React.useCallback(({ value }: InterfaceNameValue) => {
    setSearchValue(value);
  }, []);

  const handleSubmit = React.useCallback(
    ({ value }: InterfaceNameValue) => {
      if (value) onSubmit(value);
      setSearchValue("");
      setFocused(false);
    },
    [onSubmit],
  );
  const handleDismiss = React.useCallback(
    (id: string) => {
      onDismiss(id);
    },
    [onDismiss],
  );
  const handleClick = React.useCallback(() => {
    onClick();
  }, [onClick]);

  const memorizedFilters = React.useMemo(
    () =>
      appliedFilters?.map(({ id, label }) => (
        <Chip key={id} id={id} label={label} onDismiss={handleDismiss} />
      )),
    [appliedFilters, handleDismiss],
  );

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
        <div className="nimbus--search-filters__filters">
          <Button appearance="default" icon={SlidersIcon} onClick={handleClick}>
            {labelButton}
          </Button>
        </div>
      </div>
      <div className="nimbus--search-filters__results">
        <Text>{resultCount}</Text>
        {memorizedFilters}
      </div>
    </div>
  );
}

export default React.memo(SearchFilter);
