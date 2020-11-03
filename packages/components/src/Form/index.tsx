import * as React from "react";

import "./Form.css";
import Link from "../Link";
import Button from "../Button";
import Alert from "../Alert";

import {
  useForm,
  ValidationsContextProvider,
  FieldsContainer,
  InterfaceOnSubmit,
  InterfaceTextValidation,
} from "../validator";

export interface InterfaceForm {
  /** Validation alert text */
  alertText?: string;
  /** Validation alert appearance */
  alertAppearance?: "primary" | "secondary" | "danger" | "success" | "warning";
  /** React node of type children */
  children: React.ReactNode;
  /** Link text */
  link?: string;
  /** Link href */
  linkTo?: string;
  /** It renders submit button as disabled with spinner */
  submitting?: boolean;
  /** Submit button label when submitting */
  submittingLabel?: string;
  /** Submit button label */
  submitLabel: string;
  /** Type of react mouse event onclick to manage event click and void return */
  onClickSubmit: (data: { [key: string]: string }) => void;
  /** Optional button label */
  buttonLabel?: string;
  /** Type of react mouse event onclick to manage event click and void return */
  onClickButton?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  /**
   * Structure with text for validation: {required: "this field is required",
   * email:" this field is not email" ... }
   */
  textValidation?: InterfaceTextValidation;
}

function Form({
  alertText,
  alertAppearance = "danger",
  children,
  link,
  linkTo,
  submitting,
  submitLabel,
  onClickSubmit,
  buttonLabel,
  onClickButton,
  textValidation = {},
}: InterfaceForm): JSX.Element {
  const { isSubmit, setFields, handleSubmit } = useForm();

  const renderLink = link && linkTo && <Link href={linkTo}>{link}</Link>;

  const renderButton = onClickButton && buttonLabel && (
    <div className="nimbus--action-wrapper__item">
      <Button onClick={onClickButton}>{buttonLabel}</Button>
    </div>
  );

  const onSubmit: InterfaceOnSubmit = ({ data, formIsValid }) => {
    if (!formIsValid) {
      return;
    }
    onClickSubmit(data);
  };

  return (
    <div data-testid="Form" className="nimbus--form">
      {alertText && (
        <Alert appearance={alertAppearance} show>
          {alertText}
        </Alert>
      )}
      <form action="">
        <ValidationsContextProvider>
          <FieldsContainer {...{ isSubmit, setFields, textValidation }}>
            {children}
          </FieldsContainer>
        </ValidationsContextProvider>
      </form>
      {renderLink}
      <div className="nimbus--form__actions">
        {renderButton}
        <div className="nimbus--action-wrapper__item">
          <Button
            appearance="primary"
            onClick={handleSubmit(onSubmit)}
            spinner={submitting}
            disabled={submitting}
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Form;
