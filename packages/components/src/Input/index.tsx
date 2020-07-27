import * as React from "react";

import { withValidator } from "../validator";
import { InputTypes } from "../validator/interfaces";

import "./Input.css";

export interface InterfaceInput {
  /**
   * Input name
   */
  name: string;
  /**
   * Input value
   */
  placeholder: string;
  /**
   *  Label
   */
  label: string;
  /**
   *  onChange callback function
   */
  value?: string;
  /**
   * Input placeholder
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   *  onChange callback function
   */
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Input type change keyboard, validations and insert type char.
   * "number" | "text" | "tel" | "password" | "email"
   */
  type?: InputTypes;
  /**
   * Minimum count of inserted chars
   */
  minLength?: string;
  /**
   * Maximum count of inserted chars
   */
  maxLength?: string;
  /**
   * Custom Regex needed for validate inserted chars
   */
  pattern?: string;
  /**
   * Input is required
   * */
  required?: boolean;
}

/**
 *  @param name input name
 *  @param type input type
 *  @param value input value
 *  @param placeholder input placeholder
 *  @param label input label
 *  @param onChange callback function
 */
export const Input = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  minLength = "0",
  maxLength = "32",
  required = false,
}: InterfaceInput): JSX.Element => {
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      onChange?.(event);
    },
    [],
  );

  const handleBlur = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onBlur?.(event);
    },
    [],
  );

  return (
    <div className="nimbus--input">
      <label htmlFor={`input_${name}`}>{label}</label>
      <input
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        id={`input_${name}`}
        type={type}
        name={name}
        placeholder={placeholder}
        minLength={parseInt(minLength)}
        maxLength={parseInt(maxLength)}
        required={required}
      />
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

export const InputValidator = withValidator(React.memo(Input));
export default React.memo(Input);
