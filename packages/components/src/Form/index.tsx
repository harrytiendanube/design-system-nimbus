import * as React from "react";
import "@tiendanube/styles/css/Form.css";
import { Button, Title, Text, Link, Alert } from "..";

export interface InterfaceForm
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "style"> {
  /** Title text */
  titleText?: string;
  /** Subtitle text */
  subtitleText?: string;
  /** Validation alert text */
  alertText?: string;
  /** Validation alert text */
  alertAppearance?: "primary" | "secondary" | "danger" | "success" | "warning";
  /** Element inside tag component */
  children: React.ReactNode;
  /** Link text  */
  linkText?: string;
  /** Link href */
  linkHref?: string;
  /** Submit text */
  submitText: string;
  /** Submit callback */
  submitCallback: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  /** Optional Button */
  optionalButtonText?: string;
  /** Optional button callback  */
  optionalCallback?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

const Form: React.FC<InterfaceForm> = ({
  titleText,
  subtitleText,
  alertText,
  alertAppearance = "primary",
  children,
  linkText,
  linkHref,
  submitText,
  submitCallback,
  optionalButtonText,
  optionalCallback,
  ...share
}: InterfaceForm) => {
  return (
    <div {...share} className="nimbus--form">
      {titleText && <Title>Form Title</Title>}
      {subtitleText && <Text>Form Subtitle</Text>}
      {alertText && (
        <Alert type="inline" appearance={alertAppearance}>
          {alertText}
        </Alert>
      )}
      <form action="">{children}</form>
      {linkText && <Link href={linkHref}>{linkText}</Link>}
      <div className="nimbus--form__actions">
        {optionalCallback && (
          <Button color="light" onClick={optionalCallback}>
            {optionalButtonText}
          </Button>
        )}
        <Button color="primary" onClick={submitCallback}>
          {submitText}
        </Button>
      </div>
    </div>
  );
};

export default Form;
