import * as React from "react";
import { ValidationsContext } from "./FormContext";
import { InterfaceFieldsContainer } from "./interfaces";

/** @param children Children */
const FieldsContainer = ({
  children,
  setFields,
  isSubmit,
  textValidation,
}: InterfaceFieldsContainer): JSX.Element => {
  const { setSubmitted, formFields, setTextValidation } = React.useContext(
    ValidationsContext,
  );

  React.useEffect(() => {
    setFields(formFields);
  }, [formFields]);

  React.useEffect(() => {
    setSubmitted(isSubmit);
  }, [isSubmit]);

  React.useEffect(() => {
    setTextValidation(textValidation);
  }, [setTextValidation, textValidation]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default React.memo(FieldsContainer);
