import * as React from "react";

import validator from "./validator";
import {
  InterfaceValidationsContext,
  InterfaceFormFields,
  InterfaceValidateField,
} from "./interfaces";

export const ValidationsContext = React.createContext<
  InterfaceValidationsContext
>({} as InterfaceValidationsContext);

const ValidationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [formFields, setFormFields] = React.useState<InterfaceFormFields>(
    {} as InterfaceFormFields,
  );

  const [submitted, setSubmitted] = React.useState<Boolean>(false);

  const validateField: InterfaceValidateField = (name, fieldValidate) => {
    const error = validator(fieldValidate.validation, fieldValidate.value);

    setFormFields((prevState: {}) => {
      return {
        ...prevState,
        ...{
          [name]: {
            ...fieldValidate,
            error,
          },
        },
      };
    });
  };

  const value = { submitted, setSubmitted, formFields, validateField };

  return (
    <ValidationsContext.Provider value={value}>
      {children}
    </ValidationsContext.Provider>
  );
};

export default ValidationsContextProvider;
