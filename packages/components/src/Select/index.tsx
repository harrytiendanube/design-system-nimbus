import * as React from "react";

import "./Select.css";

import { ChevronDownIcon } from "@tiendanube/icons";
import { RenderOption, RenderGroup } from "./renders";
import {
  InterfaceNameValue,
  InterfaceSelectOption,
  InterfaceSelectGroup,
  InterfaceSelectOptionGroup,
} from "../common/interfaces";

interface InterfaceSelect {
  /** Name of the select */
  name: string;
  /** Text to be displayed in the label */
  label?: string;
  /** Array of options to be displayed */
  options: InterfaceSelectOptionGroup[];
  /** Current value */
  value?: string;
  /** Text to be used as placeholder. It is the first option and is disabled */
  placeholder?: string;
  /** OnChange callback function */
  onChange?: (event: InterfaceNameValue) => void;
}

/**
 * @param label Text to be displayed in the label
 * @param name Name of the select
 * @param options Array of options to be displayed
 * @param value Current value
 * @param placeholder Text to be used as placeholder. It is the first option and
 *     is disabled
 */

function Select({
  name,
  label: selectLabel,
  options,
  value: selectValue = "",
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
        <label className="nimbus--select__label" htmlFor={`select_${name}`}>
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
      options.map((opt: InterfaceSelectOptionGroup) => {
        const group = opt as InterfaceSelectGroup;
        const option = opt as InterfaceSelectOption;
        if (group.group) {
          return (
            <RenderGroup
              key={`grp_${group.group}`}
              group={group.group}
              options={group.options}
            />
          );
        }
        return (
          <RenderOption
            key={`opt_${option.value}`}
            label={option.label}
            value={option.value}
            disabled={option.disabled}
          />
        );
      }),
    [options],
  );

  return (
    <div className="nimbus--select-wrapper">
      {memorizedLabel}
      <div className="nimbus--select">
        <select
          className="nimbus--select__field"
          id={`select_${name}`}
          name={name}
          value={selectValue}
          onChange={handleChange}
        >
          {memorizedPlaceholder}
          {memorizedOptions}
        </select>
        <div className="nimbus--select__append">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Select);
