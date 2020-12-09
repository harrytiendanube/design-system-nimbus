import * as React from "react";

import "./Checkbox.css";

import { CheckIcon } from "@tiendanube/icons";
import { InterfaceNameChecked } from "../common/interfaces";

interface InterfaceCheckbox {
  /** Name of the checkbox */
  name: string;
  /** Text to be displayed in the label */
  label?: string;
  /** Whether the checkbox is checked by default or not */
  checked?: boolean | "indeterminate";
  /** Indicates if the checkbox is disabled */
  disabled?: boolean;
  /** Event to be fired upon checking the checkbox */
  onChange?(event: InterfaceNameChecked): void;
}

function Checkbox({
  name,
  label,
  checked = false,
  disabled = false,
  onChange,
}: InterfaceCheckbox): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    onChange?.({ name: target.name, checked: target.checked });
  };

  const renderChecked = checked && (
    <div className="nimbus--checkbox__check">
      <CheckIcon />
    </div>
  );

  const isIndeterminate = checked === "indeterminate";
  const isChecked = !isIndeterminate && Boolean(checked);

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (!isChecked) inputRef.current?.blur();
  }, [isChecked]);

  return (
    <div className="nimbus--checkbox-wrapper">
      <input
        type="checkbox"
        id={`check_${name}`}
        ref={inputRef}
        name={name}
        onChange={handleChange}
        value={name}
        className={`nimbus--checkbox ${isIndeterminate ? "indeterminate" : ""}`}
        checked={isChecked}
        disabled={disabled}
      />
      <label
        htmlFor={`check_${name}`}
        className={`nimbus--checkbox-label ${
          !label ? "nimbus--label-hidden" : ""
        }`}
      >
        <span className="nimbus--text">{label}</span>
      </label>
      {renderChecked}
    </div>
  );
}

const Skeleton = () => <div className="nimbus--checkbox-skeleton" />;

Checkbox.Skeleton = Skeleton;

export default Checkbox;
