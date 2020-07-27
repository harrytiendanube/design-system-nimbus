import * as React from "react";

import { ValidationsContext } from "./FormContext";
import { InterfaceValidation } from "./interfaces";
import { InterfaceInput } from "../Input";

const INPUT_VALUE_DEFAULT = "";

const withValidation = (FieldComponent: React.FC<InterfaceInput>) =>
  React.memo((props: InterfaceInput) => {
    const { formFields, validateField, submitted } = React.useContext(
      ValidationsContext,
    );
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
    const setFormFields = (valueField: string) => {
      validateField(name, {
        value: valueField,
        validation,
      });
    };

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange?.(event);
      },
      [],
    );

    /**
     * @param event
     */
    const handleBlur = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormFields(event.target.value);

        onBlur?.(event);
      },
      [],
    );

    React.useEffect(() => {
      setFormFields(value);
    }, []);

    return (
      <React.Fragment>
        <FieldComponent
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
        <p style={{ color: "red" }}>
          {submitted && formFields[name] && formFields[name].error}
        </p>
      </React.Fragment>
    );
  });

export default withValidation;
