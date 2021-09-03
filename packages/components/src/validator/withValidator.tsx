import * as React from "react";

import { ValidationsContext } from "./FormContext";
import { InterfaceValidation } from "./interfaces";
import { InterfaceInput } from "../Input";
import { InterfaceNameValue } from "../common/interfaces";

const INPUT_VALUE_DEFAULT = "";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const withValidation = (FieldComponent: React.FC<InterfaceInput>) =>
  React.memo((props: InterfaceInput) => {
    const {
      formFields,
      validateField,
      submitted,
      textValidation,
    } = React.useContext(ValidationsContext);
    const {
      name,
      placeholder,
      label,
      value = INPUT_VALUE_DEFAULT,
      type,
      inputMode,
      multiRows,
      rows,
      focused,
      prependIcon,
      prependLabel,
      appendLabel,
      minLength,
      maxLength,
      pattern,
      required,
      autoCapitalize,
      autoCorrect,
      onChange,
      onSubmit,
      onBlur,
      onFocus,
    } = props;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const validation: InterfaceValidation = {
      required,
      type,
      minLength,
      pattern,
    };

    const setFormFields = React.useCallback(
      (valueField: string) => {
        validateField(name, {
          value: valueField,
          validation,
        });
      },
      [name, validateField, validation],
    );

    const handleChange = React.useCallback(
      (event: InterfaceNameValue): void => {
        onChange?.(event);
      },
      [onChange],
    );

    /** @param event */
    const handleBlur = React.useCallback(
      (event: InterfaceNameValue): void => {
        setFormFields(event.value);
        onBlur?.(event);
      },
      [onBlur, setFormFields],
    );

    React.useEffect(() => {
      setFormFields(value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showError = React.useCallback(
      (nameField: string, error: string | undefined): string | null => {
        if (error && textValidation) {
          return {}.hasOwnProperty.call(textValidation, nameField)
            ? textValidation[nameField]
            : error;
        }
        return null;
      },
      [textValidation],
    );

    const error =
      submitted && formFields[name] && showError(name, formFields[name].error)
        ? showError(name, formFields[name].error)
        : "";

    const appearanceError = error ? "validation_error" : "default";
    return (
      <FieldComponent
        name={name}
        placeholder={placeholder}
        label={label}
        value={value}
        type={type}
        inputMode={inputMode}
        multiRows={multiRows}
        rows={rows}
        focused={focused}
        prependIcon={prependIcon}
        prependLabel={prependLabel}
        appendLabel={appendLabel}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required={required}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        onSubmit={onSubmit}
        onFocus={onFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        appearance={appearanceError}
        helpText={error}
      />
    );
  });

export default withValidation;
