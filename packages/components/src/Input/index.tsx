import * as React from "react";
import classNames from "classnames";

import {
  SearchIcon,
  CloseIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeOffIcon,
  Icon as IconType,
} from "@tiendanube/icons";

import { withValidator } from "../validator";
import { InputTypes, InputModes } from "../validator/interfaces";
import { InterfaceNameValue } from "../common/interfaces";
import Text from "../Text";

import "./Input.css";
import { Spinner } from "../Spinner";

export interface InterfaceInput {
  /** Name of the input, also used for the ID */
  name: string;
  /** Input placeholder */
  placeholder?: string;
  /** Label */
  label?: string;
  /** Icon to be displayed in the label */
  labelIcon?: IconType;
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
  /** Determines whether the input is disabled */
  disabled?: boolean;
  /** Controls if text input is automatically selected */
  autoSelect?: boolean;
  /** OnChange callback function */
  onChange?: (event: InterfaceNameValue) => void;
  /** OnSubmit callback function */
  onSubmit?: (event: InterfaceNameValue) => void;
  /** OnBlur callback function */
  onBlur?: (event: InterfaceNameValue) => void;
  /** OnFocus callback function */
  onFocus?: (event: InterfaceNameValue) => void;
  /** Type of appearance */
  appearance?:
    | "default"
    | "warning"
    | "danger"
    | "validation_loading"
    | "validation_success"
    | "validation_error";
  /** Helper message */
  helpText?: string | null;
}

function Input({
  name,
  placeholder,
  label = "",
  labelIcon: LabelIcon,
  value = "",
  type = "text",
  inputMode,
  multiRows = false,
  rows = 1,
  focused = false,
  prependIcon: PrependIcon,
  prependLabel,
  appendLabel,
  appearance = "default",
  helpText,
  minLength = 0,
  maxLength = 50,
  required = false,
  autoCapitalize = false,
  autoCorrect = false,
  disabled = false,
  autoSelect = false,
  onChange,
  onSubmit,
  onBlur,
  onFocus,
}: InterfaceInput): JSX.Element {
  const [colorInput, setColorInput] = React.useState("#ffffff");
  const [showPassword, setsShowPassword] = React.useState(false);
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { target } = event;
    if (type === "color") setColorInput(target.value);
    onChange?.({ name: target.name, value: target.value });
  };

  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { target } = event;
    onFocus?.({ name: target.name, value: target.value });
    if (autoSelect) inputRef.current?.select();
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
    }
  };

  const handleClose = () => {
    onSubmit?.({ name, value: "" });
  };

  const renderLabel = type !== "search" && label && (
    <label className="nimbus--input__label" htmlFor={`input_${name}`}>
      {LabelIcon && (
        <div className="nimbus--input__label-icon">
          <LabelIcon />
        </div>
      )}
      {label}
    </label>
  );

  const prependClassname = classNames("nimbus--input__prepend", {
    "nimbus--input__error": appearance === "validation_error",
    "nimbus--input__success": appearance === "validation_success",
  });

  const appendClassname = classNames("nimbus--input__append", {
    "nimbus--input__error": appearance === "validation_error",
    "nimbus--input__success": appearance === "validation_success",
  });

  const renderPrependLabel = prependLabel && (
    <span className={prependClassname}>{prependLabel}</span>
  );
  const renderAppendLabel = appendLabel && (
    <span className={appendClassname}>{appendLabel}</span>
  );

  const renderLeftIcon = (PrependIcon || type === "search") && (
    <span className={prependClassname}>
      {type === "search" && <SearchIcon />}
      {PrependIcon && <PrependIcon />}
    </span>
  );

  const renderColorInput = type === "color" && (
    <div className="nimbus--input--color--container">
      <input
        type="color"
        className="nimbus--input--color"
        value={colorInput}
        data-testid="inputField-color"
        onChange={(e) => setColorInput(e.target.value)}
      />
    </div>
  );

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "search":
        return (
          <button
            type="button"
            className="nimbus--input__append nimbus--input__append__inside__icon"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        );
      case "error":
        return (
          <span className="nimbus--input__append nimbus--input__append__inside__icon">
            <ExclamationCircleIcon />
          </span>
        );

      case "success":
        return (
          <span className="nimbus--input__append nimbus--input__append__inside__icon">
            <CheckCircleIcon />
          </span>
        );
      case "password":
        return (
          <button
            type="button"
            className="nimbus--input__append nimbus--input__password"
            onClick={() => setsShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        );

      case "isLoading":
        return (
          <span className="nimbus--input__append nimbus--input__append__inside__icon nimbus--input__spinner">
            <Spinner />
          </span>
        );
      default:
        return null;
    }
  };

  const handleType = type !== "search" && type !== "password";

  const renderRightIcon = (
    <>
      {type === "search" && value && getIcon("search")}
      {type === "password" && value && getIcon("password")}
      {handleType && appearance === "validation_error" && getIcon("error")}
      {handleType && appearance === "validation_success" && getIcon("success")}
      {handleType &&
        appearance === "validation_loading" &&
        getIcon("isLoading")}
    </>
  );

  const newType = showPassword || type === "color" ? "text" : type;
  const newValue = type === "color" ? colorInput : value;

  const classname = classNames("nimbus--input__field", {
    "with-prepend": renderLeftIcon,
    "with-append": type === "search" || type === "password",
    "with-color": type === "color",
  });

  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputTextAreaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const input = (multiRows ? inputTextAreaRef.current : inputRef.current) as
      | HTMLInputElement
      | HTMLTextAreaElement;
    if (focused) input.focus();
    else input.blur();
  }, [focused, multiRows]);

  const inputField = (
    <>
      <div className="nimbus--input">
        {multiRows && (
          <textarea
            data-testid="textAreaField"
            className="nimbus--input__field"
            id={`input_${name}`}
            ref={inputTextAreaRef}
            name={name}
            inputMode={inputMode}
            value={value}
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
            disabled={disabled}
          />
        )}
        {!multiRows && (
          <>
            <input
              data-testid="inputField"
              className={classname}
              id={`input_${name}`}
              name={name}
              type={newType}
              inputMode={inputMode}
              ref={inputRef}
              value={newValue}
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
              disabled={disabled}
            />
            {renderLeftIcon}
            {renderRightIcon}
            {renderColorInput}
          </>
        )}
      </div>
    </>
  );

  const className = classNames("nimbus--input-wrapper", {
    "nimbus--input-validation--error": appearance === "validation_error",
    "nimbus--input--disabled": disabled,
    "nimbus--input-validation--success": appearance === "validation_success",
    "nimbus--input-danger": appearance === "danger",
    "nimbus--input-warning": appearance === "warning",
  });

  const appearanceError = appearance === "validation_error" && "danger";
  const appearanceSuccess = appearance === "validation_success" && "success";
  const appearanceMessage = appearanceError || appearanceSuccess || "default";

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
      {helpText && (
        <Text
          block
          size="small"
          appearance={appearanceMessage}
          textAlign="left"
        >
          {helpText}
        </Text>
      )}
    </div>
  );
}

export interface InterfaceTextSkeleton {
  /** Amount of rows for the skeleton input to emulate a textarea */
  rows?: number;
}

function Skeleton({ rows = 1 }: InterfaceTextSkeleton): JSX.Element {
  const skeletonClassName = classNames(
    "nimbus--input-skeleton",
    `rows-${rows}`,
  );

  return (
    <div className={skeletonClassName}>
      <div className="nimbus--input-skeleton__label" />
      <div className="nimbus--input-skeleton__field" />
    </div>
  );
}

Input.Skeleton = Skeleton;

export const InputValidator = withValidator(Input);
export default Input;
