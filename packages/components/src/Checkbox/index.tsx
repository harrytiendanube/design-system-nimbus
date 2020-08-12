import * as React from "react";

import "./Checkbox.css";

import { CheckIcon } from "@tiendanube/icons";
import { InterfaceNameChecked } from "../common/interfaces";

interface InterfaceCheckbox {
  /**
   * Name of the checkbox
   * */
  name: string;
  /**
   * Text to be displayed in the label
   * */
  label?: string;
  /**
   * Whether the checkbox is checked by default or not
   * */
  checked?: boolean;
  /**
   * Indicates if the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Event to be fired upon checking the checkbox
   * */
  onChange?(event: InterfaceNameChecked): void;
}

/**
 *  @param name Name of the checkbox
 *  @param label Text to be displayed in the label
 *  @param checked Whether the checkbox is checked by default or not
 *  @param disabled Indicates if the checkbox is disabled
 *  @param onChange Event to be fired upon checking the checkbox
 */
function Checkbox({
  name,
  label,
  checked,
  disabled,
  onChange,
}: InterfaceCheckbox): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    onChange?.({ name: target.name, checked: target.checked });
  };
  const memorizedLabel = React.useMemo(
    () => `nimbus--checkbox-label${label ? "" : "--hidden"}`,
    [label],
  );
  const memorizedChecked = React.useMemo(
    () =>
      checked && (
        <div className="nimbus--checkbox__check">
          <CheckIcon />
        </div>
      ),
    [checked],
  );
  return (
    <div className="nimbus--checkbox-wrapper">
      <input
        type="checkbox"
        id={`check_${name}`}
        name={name}
        onChange={handleChange}
        value={name}
        className="nimbus--checkbox"
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={`check_${name}`} className={memorizedLabel}>
        <span className="nimbus--text">{label}</span>
      </label>
      {memorizedChecked}
    </div>
  );
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
};

export default React.memo(Checkbox);
