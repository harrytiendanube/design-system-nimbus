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
} from "../validator";

export interface InterfaceForm {
  /**
   * Validation alert text
   */
  alertText?: string;
  /**
   * Validation alert appearance
   */
  alertAppearance?: "primary" | "secondary" | "danger" | "success" | "warning";
  /**
   * React node of type children
   */
  children: React.ReactNode;
  /**
   * Link text
   */
  link?: string;
  /**
   * Link href
   */
  linkTo?: string;
  /**
   * Submit button label
   */
  submitLabel: string;
  /**
   * Type of react mouse event onclick to manage event click and void return
   */
  onClickSubmit: (data: { [key: string]: string }) => void;
  /**
   *  Optional button label
   */
  buttonLabel?: string;
  /**
   * Type of react mouse event onclick to manage event click and void return
   */
  onClickButton?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

/**
 *  @param alertText Validation alert text
 *  @param alertAppearance  React node of type children
 *  @param children React node of type children
 *  @param link Link text
 *  @param linkTo Link href
 *  @param submitLabel Submit button text
 *  @param onClickSubmit Submit button callback
 *  @param buttonLabel Optional Button Text
 *  @param onClickButton Type of react mouse event onclick to manage event click and void return
 */

function Form({
  alertText,
  alertAppearance,
  children,
  link,
  linkTo,
  submitLabel,
  onClickSubmit,
  buttonLabel,
  onClickButton,
}: InterfaceForm): JSX.Element {
  const { isSubmit, setFields, handleSubmit } = useForm();

  const memorizedLink = React.useMemo(() => {
    return link && linkTo && <Link href={linkTo}>{link}</Link>;
  }, [link, linkTo]);

  const memorizedButton = React.useMemo(() => {
    return (
      onClickButton &&
      buttonLabel && (
        <Button appearance="light" onClick={onClickButton}>
          {buttonLabel}
        </Button>
      )
    );
  }, [onClickButton, buttonLabel]);

  const onSubmit: InterfaceOnSubmit = ({ data, formIsValid }) => {
    if (!formIsValid) {
      return;
    }
    onClickSubmit(data);
  };

  return (
    <div data-testid="Form" className="nimbus--form">
      <Alert appearance={alertAppearance} show={!!alertText}>
        {alertText || ""}
      </Alert>
      <form action="">
        <ValidationsContextProvider>
          <FieldsContainer {...{ isSubmit, setFields }}>
            {children}
          </FieldsContainer>
        </ValidationsContextProvider>
      </form>
      {memorizedLink}
      <div className="nimbus--form__actions">
        {memorizedButton}
        <Button appearance="primary" onClick={handleSubmit(onSubmit)}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}

Form.defaultProps = { alertAppearance: "danger" };

export default React.memo(Form);
