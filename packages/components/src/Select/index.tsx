import * as React from "react";

import "./Select.css";

import { ChevronDownIcon } from "@tiendanube/icons";
import { renderOption, renderGroup } from "./renders";
import {
  InterfaceNameValue,
  InterfaceSelectOption,
  InterfaceSelectGroup,
  InterfaceSelectOptionGroup,
} from "../common/interfaces";

interface InterfaceSelect {
  /**
   * Name of the input
   * */
  name: string;
  /**
   * Text to be displayed in the label
   * */
  label?: string;
  /**
   * Array of options to be displayed
   */
  options: InterfaceSelectOptionGroup[];
  /**
   * Current value
   */
  value?: string;
  /**
   * Text to be used as placeholder. It is the first option and is disabled
   */
  placeholder?: string;
  /**
   *  onChange callback function
   */
  onChange?: (event: InterfaceNameValue) => void;
}

/**
 *  @param label Text to be displayed in the label
 *  @param name Name of the input
 *  @param options Array of options to be displayed
 *  @param value Current value
 *  @param placeholder Text to be used as placeholder. It is the first option and is disabled
 */

function Select({
  name,
  label: selectLabel,
  options,
  value: selectValue,
  placeholder,
  onChange,
}: InterfaceSelect): JSX.Element {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      onChange?.({ name: target.name, value: target.value });
    },
    [onChange],
  );

  const memorizedLabel = React.useMemo(
    () =>
      selectLabel && (
        <label className="nimbus--input__label" htmlFor={`select_${name}`}>
          {selectLabel}
        </label>
      ),
    [selectLabel, name],
  );
  const memorizedPlaceholder = React.useMemo(() => {
    return (
      placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )
    );
  }, [placeholder]);

  const memorizedOptions = React.useMemo(
    () =>
      options.map((option: InterfaceSelectOptionGroup) => {
        const optionGroup = option as InterfaceSelectGroup;
        const optionSingle = option as InterfaceSelectOption;
        return (optionGroup as InterfaceSelectGroup).group
          ? renderGroup(optionGroup)
          : renderOption(optionSingle);
      }),
    [options],
  );

  return (
    <div className="nimbus--input-wrapper">
      {memorizedLabel}
      <div className="nimbus--input">
        <select
          className="nimbus--select"
          id={`select_${name}`}
          name={name}
          value={selectValue}
          onChange={handleChange}
        >
          {memorizedPlaceholder}
          {memorizedOptions}
        </select>
        <div className="nimbus--input__append">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
}

Select.defaultProps = {
  value: "",
};

export default React.memo(Select);
