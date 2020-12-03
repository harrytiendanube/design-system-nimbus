import * as React from "react";
import classNames from "classnames";

import {
  SearchIcon,
  CloseIcon,
  ExclamationCircleIcon,
  Icon as IconType,
} from "@tiendanube/icons";

import { withValidator } from "../validator";
import { InputTypes, InputModes } from "../validator/interfaces";
import { InterfaceNameValue } from "../common/interfaces";
import Text from "../Text";

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
  /** Input mode */
  inputMode?: InputModes;
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
  prependIcon?: IconType;
  /** Prepend label */
  prependLabel?: string;
  /** Append label */
  appendLabel?: string;
  /** Error message */
  error?: string;
  /** Minimum count of inserted chars */
  minLength?: number;
  /** Maximum count of inserted chars */
  maxLength?: number;
  /** Custom Regex needed for validate inserted chars */
  pattern?: string;
  /** Input is required */
  required?: boolean;
  /** Controls if text input is automatically capitalized */
  autoCapitalize?: boolean;
  /** Controls if text input is automatically corrected */
  autoCorrect?: boolean;
  /** OnChange callback function */
  onChange?: (event: InterfaceNameValue) => void;
  /** OnSubmit callback function */
  onSubmit?: (event: InterfaceNameValue) => void;
  /** OnBlur callback function */
  onBlur?: (event: InterfaceNameValue) => void;
  /** OnFocus callback function */
  onFocus?: (event: InterfaceNameValue) => void;
}

function Input({
  name,
  placeholder,
  label = "",
  value = "",
  type = "text",
  inputMode,
  multiRows = false,
  rows = 1,
  focused = false,
  prependIcon: PrependIcon,
  prependLabel,
  appendLabel,
  error,
  minLength = 0,
  maxLength = 50,
  required = false,
  autoCapitalize = false,
  autoCorrect = false,
  onChange,
  onSubmit,
  onBlur,
  onFocus,
}: InterfaceInput): JSX.Element {
  if (prependLabel && PrependIcon) {
    throw new Error(
      "You can not use parameters 'prependLabel' and 'prependIcon' simultaneously",
    );
  }
  if ((prependLabel || appendLabel || PrependIcon) && type === "search") {
    throw new Error(
      "You can not use parameters 'prependLabel' or 'appendLabel' or 'prependIcon' with type='search'",
    );
  }

  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { target } = event;
    setInputValue(target.value);
    onChange?.({ name: target.name, value: target.value });
  };

  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { target } = event;
    onFocus?.({ name: target.name, value: target.value });
  };

  const handleBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { target } = event;
    onBlur?.({ name: target.name, value: target.value });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && type === "search") {
      e.preventDefault();
      onSubmit?.({ name, value });
      setInputValue("");
    }
  };

  const handleClose = () => {
    onSubmit?.({ name, value: "" });
    setInputValue("");
  };

  const renderLabel = type !== "search" && (
    <label className="nimbus--input__label" htmlFor={`input_${name}`}>
      {label}
    </label>
  );

  const renderPrependLabel = prependLabel && (
    <span className="nimbus--input__prepend">{prependLabel}</span>
  );
  const renderAppendLabel = appendLabel && (
    <span className="nimbus--input__append">{appendLabel}</span>
  );

  const renderLeftIcon = (PrependIcon || type === "search") && (
    <span className="nimbus--input__prepend">
      {type === "search" && <SearchIcon />}
      {PrependIcon && <PrependIcon />}
    </span>
  );

  const renderRightIcon = (
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
      {type !== "search" && error && (
        <span className="nimbus--input__append">
          <ExclamationCircleIcon />
        </span>
      )}
    </>
  );

  const classname = classNames("nimbus--input__field", {
    "with-prepend": renderLeftIcon,
    "with-append": type === "search" || type === "password",
  });

  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputTextAreaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const input = multiRows ? inputTextAreaRef.current : inputRef.current;
    if (!input || focused === undefined) return;
    if (focused) input.focus();
    else input.blur();
  }, [focused, multiRows]);

  const inputField = (
    <>
      <div className="nimbus--input">
        {multiRows ? (
          <textarea
            className="nimbus--input__field"
            id={`input_${name}`}
            ref={inputTextAreaRef}
            name={name}
            inputMode={inputMode}
            value={inputValue}
            placeholder={placeholder}
            rows={rows}
            autoCapitalize={autoCapitalize ? "on" : "off"}
            autoCorrect={autoCorrect ? "on" : "off"}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
          />
        ) : (
          <>
            <input
              className={classname}
              id={`input_${name}`}
              name={name}
              type={type}
              inputMode={inputMode}
              ref={inputRef}
              value={inputValue}
              placeholder={placeholder}
              autoCapitalize={autoCapitalize ? "on" : "off"}
              autoCorrect={autoCorrect ? "on" : "off"}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              onBlur={handleBlur}
              onFocus={handleFocus}
              minLength={minLength}
              maxLength={maxLength}
              required={required}
            />
            {renderLeftIcon}
            {renderRightIcon}
          </>
        )}
      </div>
    </>
  );

  const className = classNames(
    "nimbus--input-wrapper",
    { "nimbus--input-validation--error": error, }
    );

  return (
    <div className={className}>
      {renderLabel}
      {renderPrependLabel || renderAppendLabel ? (
        <div className="nimbus--input__container">
          {renderPrependLabel}
          {inputField}
          {renderAppendLabel}
        </div>
      ) : (
        inputField
      )}
      {error && <Text block size="small" appearance="danger" textAlign="left">{error}</Text>}
    </div>
  );
}

export const InputValidator = withValidator(Input);
export default Input;
