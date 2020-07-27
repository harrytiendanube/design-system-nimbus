import * as React from "react";
import { ValidationsContext } from "./FormContext";
import { InterfaceFieldsContainer } from "./interfaces";

/**
 *  @param children Children
 */
const FieldsContainer = ({
  children,
  setFields,
  isSubmit,
}: InterfaceFieldsContainer): JSX.Element => {
  const { setSubmitted, formFields } = React.useContext(ValidationsContext);

  React.useEffect(() => {
    setFields(formFields);
  }, [formFields]);

  React.useEffect(() => {
    setSubmitted(isSubmit);
  }, [isSubmit]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default React.memo(FieldsContainer);
