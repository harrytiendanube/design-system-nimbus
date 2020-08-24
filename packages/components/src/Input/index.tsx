import * as React from "react";

import { SearchIcon, CloseIcon } from "@tiendanube/icons";
import { withValidator } from "../validator";
import { InputTypes } from "../validator/interfaces";
import { InterfaceNameValue } from "../common/interfaces";

import "./Input.css";

export interface InterfaceInput {
  /**
   * Name of the input, also used for the ID
   */
  name: string;
  /**
   * Input placeholder
   */
  placeholder: string;
  /**
   *  Label
   */
  label?: string;
  /**
   * Input value
   */
  value?: string;
  /**
   * Input type change keyboard, validations and insert type char.
   * "number" | "text" | "tel" | "password" | "email" | "search"
   */
  type?: InputTypes;
  /**
   * Prepend a component to show at the start of the input
   */
  prepend?: any;
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
  /**
   *  onChange callback function
   */
  onChange?: (event: InterfaceNameValue) => void;
  /**
   *  onSubmit callback function
   */
  onSubmit?: (event: InterfaceNameValue) => void;
  /**
   *  onBlur callback function
   */
  onBlur?: (event: InterfaceNameValue) => void;
}

/**
 *  @param name Name of the input, also used for the ID
 *  @param placeholder Placeholder text to show when the input is empty
 *  @param label Label
 *  @param value Input value
 *  @param type Input type
 *  @param prepend Prepend a component to show at the start of the input
 *  @param minLength Minimum count of inserted chars
 *  @param maxLength Maximum count of inserted chars
 *  @param pattern Custom Regex needed for validate inserted chars
 *  @param required Input is required
 *  @param onChange Callback function
 *  @param onSubmit Callback function
 *  @param onBlur Callback function
 */
function Input({
  name,
  placeholder,
  label = "",
  value = "",
  type = "text",
  prepend: Prepend,
  minLength = "0",
  maxLength = "32",
  required = false,
  onChange,
  onSubmit,
  onBlur,
}: InterfaceInput): JSX.Element {
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      setInputValue(target.value);
      onChange?.({ name: target.name, value: target.value });
    },
    [onChange],
  );

  const handleBlur = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      onBlur?.({ name: target.name, value: target.value });
    },
    [onBlur],
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && type === "search") {
      e.preventDefault();
      onSubmit?.({ name, value });
      setInputValue("");
    }
  };

  const handleClose = React.useCallback(() => {
    onSubmit?.({ name, value: "" });
    setInputValue("");
  }, [name, onSubmit]);

  const memorizedLabel = React.useMemo(
    () =>
      type !== "search" && (
        <label className="nimbus--input__label" htmlFor={`input_${name}`}>
          {label}
        </label>
      ),
    [label, name, type],
  );

  const memorizedLeftIcon = React.useMemo(
    () =>
      (Prepend || type === "search") && (
        <span className="nimbus--input__prepend">
          {type === "search" ? <SearchIcon /> : <Prepend />}
        </span>
      ),
    [type, Prepend],
  );

  const memorizedCloseIcon = React.useMemo(
    () =>
      type === "search" &&
      value && (
        <button
          type="button"
          className="nimbus--input__append"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
      ),
    [handleClose, type, value],
  );

  return (
    <div className="nimbus--input-wrapper">
      {memorizedLabel}
      <div className="nimbus--input">
        <input
          className="nimbus--input__field"
          id={`input_${name}`}
          type={type}
          name={name}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
          minLength={parseInt(minLength, 10)}
          maxLength={parseInt(maxLength, 10)}
          required={required}
        />
        {memorizedLeftIcon}
        {memorizedCloseIcon}
      </div>
    </div>
  );
}

Input.defaultProps = {
  type: "text",
  label: "",
  minLength: "0",
  maxLength: "32",
  required: false,
};

export const InputValidator = withValidator(React.memo(Input));
export default React.memo(Input);
