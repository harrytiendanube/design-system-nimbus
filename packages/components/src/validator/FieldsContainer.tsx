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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFields]);

  React.useEffect(() => {
    setSubmitted(isSubmit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  React.useEffect(() => {
    setTextValidation(textValidation);
  }, [setTextValidation, textValidation]);

  return <>{children}</>;
};

export default React.memo(FieldsContainer);
