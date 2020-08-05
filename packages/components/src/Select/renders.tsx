import * as React from "react";

import {
  InterfaceSelectOption,
  InterfaceSelectGroup,
} from "../common/interfaces";

export const renderOption = ({
  value,
  label,
  disabled = false,
}: InterfaceSelectOption): JSX.Element => {
  return (
    <option key={`key_${value}`} value={value} disabled={disabled}>
      {label}
    </option>
  );
};

const renderOptions = (
  currentOptions: InterfaceSelectOption[],
): JSX.Element[] =>
  currentOptions.map((option: InterfaceSelectOption) => {
    return renderOption(option);
  }); 

export const renderGroup = (group: InterfaceSelectGroup): JSX.Element => {
  return (
    <optgroup key={`key_${group.group}`} label={group.group}>
      {renderOptions(group.options)}
    </optgroup>
  );
};
