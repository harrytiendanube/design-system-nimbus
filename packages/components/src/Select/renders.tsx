import * as React from "react";

import {
  InterfaceSelectOption,
  InterfaceSelectGroup,
} from "../common/interfaces";

const RenderOption = React.memo(
  ({ value, label, disabled = false }: InterfaceSelectOption): JSX.Element => {
    return (
      <option value={value} disabled={disabled}>
        {label}
      </option>
    );
  },
);

const RenderGroup = React.memo(
  (group: InterfaceSelectGroup): JSX.Element => {
    return (
      <optgroup label={group.group}>
        {group.options.map((option: InterfaceSelectOption) => (
          <RenderOption
            key={`grp_${group.group}_opt_${option.value}`}
            {...(option as InterfaceSelectOption)}
          />
        ))}
      </optgroup>
    );
  },
);

export { RenderOption, RenderGroup };
