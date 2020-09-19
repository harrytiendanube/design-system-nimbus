import * as React from "react";

import { ValidationsContext } from "./FormContext";
import { InterfaceValidation } from "./interfaces";
import { InterfaceInput } from "../Input";
import { InterfaceNameValue } from "../common/interfaces";
import { Text } from "..";

const INPUT_VALUE_DEFAULT = "";

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
      value = INPUT_VALUE_DEFAULT,
      onChange,
      onBlur,
      required,
      type,
      minLength,
      maxLength,
      pattern,
    } = props;

    const validation: InterfaceValidation = {
      required,
      type,
      minLength,
      maxLength,
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

    return (
      <div
        className={`${
          submitted &&
          formFields[name] &&
          showError(name, formFields[name].error)
            ? "nimbus--input-validation--error"
            : "nimbus--input-validation"
        }`}
      >
        <FieldComponent
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          isValid={
            !submitted ||
            !formFields[name] ||
            !showError(name, formFields[name].error)
          }
        />

        {submitted &&
          formFields[name] &&
          showError(name, formFields[name].error) && (
            <Text size="small">
              {showError(name, formFields[name].error) || ""}
            </Text>
          )}
      </div>
    );
  });

export default withValidation;
