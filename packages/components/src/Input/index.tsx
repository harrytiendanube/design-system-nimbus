import * as React from "react";

import {
  SearchIcon,
  CloseIcon,
  ExclamationCircleIcon,
  Icon as IconType,
} from "@tiendanube/icons";

import { withValidator } from "../validator";
import { InputTypes } from "../validator/interfaces";
import { InterfaceNameValue } from "../common/interfaces";

import "./Input.css";

export interface InterfaceInput {
  /** Name of the input, also used for the ID */
  name: string;
  /** Input placeholder */
  placeholder: string;
  /** Label */
  label?: string;
  /** Input value */
  value?: string;
  /** Input type */
  type?: InputTypes;
  /** Set multiple rows format */
  multiRows?: boolean;
  /** Set the number of rows (Applies only when multiRows is true) */
  rows?: number;
  /** Force the focus state on the input */
  focused?: boolean;
  /**
   * Prepend a component to show at the start of the input. Icon Component
   * imported from @tiendanube/icons.
   */
  prepend?: IconType;
  /** Indicates if input is valid */
  isValid?: boolean;
  /** Minimum count of inserted chars */
  minLength?: string;
  /** Maximum count of inserted chars */
  maxLength?: string;
  /** Custom Regex needed for validate inserted chars */
  pattern?: string;
  /** Input is required */
  required?: boolean;
  /** OnChange callback function */
  onChange?: (event: InterfaceNameValue) => void;
  /** OnSubmit callback function */
  onSubmit?: (event: InterfaceNameValue) => void;
  /** OnBlur callback function */
  onBlur?: (event: InterfaceNameValue) => void;
}

/**
 * @param name Name of the input, also used for the ID
 * @param placeholder Placeholder text to show when the input is empty
 * @param label Label
 * @param value Input value
 * @param type Input type
 * @param multiRows Set multiple rows format
 * @param rows Set the number of rows (Applies only when multiRows is true)
 * @param focused Force the focus state on the input
 * @param prepend Prepend a component to show at the start of the input
 * @param isValid Indicates if input is valid
 * @param minLength Minimum count of inserted chars
 * @param maxLength Maximum count of inserted chars
 * @param pattern Custom Regex needed for validate inserted chars
 * @param required Input is required
 * @param onChange Callback function
 * @param onSubmit Callback function
 * @param onBlur Callback function
 */
function Input({
  name,
  placeholder,
  label = "",
  value = "",
  type = "text",
  multiRows = false,
  rows = 1,
  focused = false,
  prepend: Prepend,
  isValid = true,
  minLength = "0",
  maxLength = "32",
  required = false,
  onChange,
  onSubmit,
  onBlur,
}: InterfaceInput): JSX.Element {
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { target } = event;
      setInputValue(target.value);
      onChange?.({ name: target.name, value: target.value });
    },
    [onChange],
  );

  const handleBlur = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          {type === "search" && <SearchIcon />}
          {type !== "search" && Prepend && <Prepend />}
        </span>
      ),
    [type, Prepend],
  );

  const memorizedRightIcon = React.useMemo(
    () => (
      <>
        {type === "search" && value && (
          <button
            type="button"
            className="nimbus--input__append"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        )}
        {type !== "search" && !isValid && (
          <span className="nimbus--input__append">
            <ExclamationCircleIcon />
          </span>
        )}
      </>
    ),
    [handleClose, isValid, type, value],
  );

  const classname = React.useMemo(
    () =>
      `nimbus--input__field ${memorizedLeftIcon ? "with-prepend" : ""} ${
        type === "search" || (type === "password" && "with-append")
      }`,
    [memorizedLeftIcon, type],
  );

  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputTextAreaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const input = multiRows ? inputTextAreaRef.current : inputRef.current;
    if (!input || focused === undefined) return;
    if (focused) input.focus();
    else input.blur();
  }, [focused, multiRows]);

  return (
    <div className="nimbus--input-wrapper">
      {memorizedLabel}
      <div className="nimbus--input">
        {multiRows ? (
          <textarea
            className="nimbus--input__field"
            id={`input_${name}`}
            ref={inputTextAreaRef}
            name={name}
            value={inputValue}
            placeholder={placeholder}
            rows={rows}
            onChange={handleChange}
            onBlur={handleBlur}
            minLength={parseInt(minLength, 10)}
            maxLength={parseInt(maxLength, 10)}
            required={required}
          />
        ) : (
          <>
            <input
              className={classname}
              id={`input_${name}`}
              name={name}
              type={type}
              ref={inputRef}
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
            {memorizedRightIcon}
          </>
        )}
      </div>
    </div>
  );
}

export const InputValidator = withValidator(React.memo(Input));
export default React.memo(Input);
