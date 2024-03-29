import * as React from "react";

import "./RadioButtonGroup.css";

import { Icon as IconType } from "@tiendanube/icons";

import {
  InterfaceNameValue,
  InterfaceRadioButtonOption,
} from "../common/interfaces";
import Text from "../Text";

interface InterfaceRadioButtonGroup {
  /** Name of the radio button to group various radio buttons together */
  name: string;
  /** Text to be displayed in the label */
  label?: string;
  /** Icon to be displayed in the label */
  labelIcon?: IconType;
  /** Current value */
  value?: string;
  /** Array of options to be displayed */
  options: InterfaceRadioButtonOption[];
  /** OnChange callback function */
  onChange?: (event: InterfaceNameValue) => void;
}

/**
 * @param name Name of the radio button to group various radio buttons together
 * @param label Text to be displayed in the label
 * @param value Current value
 * @param options Array of options to be displayed
 * @param onChange OnChange callback function
 */

function RadioButtonGroup({
  name,
  label: groupLabel,
  labelIcon: Icon,
  value: groupValue,
  options,
  onChange,
}: InterfaceRadioButtonGroup): JSX.Element {
  const handleChange = React.useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({ name: target.name, value: target.value });
    },
    [onChange],
  );

  const memorizedLabel = React.useMemo(
    () =>
      groupLabel && (
        <div className="nimbus--radio-button-group__label">
          {Icon && (
            <div className="nimbus--radio-button-group__label-icon">
              <Icon />
            </div>
          )}
          {groupLabel}
        </div>
      ),
    [groupLabel, Icon],
  );
  return (
    <div className="nimbus--radio-button-group-wrapper">
      {memorizedLabel}
      <div className="nimbus--radio-button-group">
        {options.map(
          ({ label, value, disabled = false }: InterfaceRadioButtonOption) => (
            <div
              key={`key_${name}_${value}`}
              className="nimbus--radio-button-wrapper"
            >
              <input
                type="radio"
                id={`radio_${name}_${value}`}
                name={name}
                value={value}
                className="nimbus--radio-button"
                checked={groupValue === value}
                disabled={disabled}
                onChange={handleChange}
              />
              <label
                htmlFor={`radio_${name}_${value}`}
                className="nimbus--radio-button-label"
              >
                <Text size="tiny">{label}</Text>
              </label>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default React.memo(RadioButtonGroup);
