import * as React from "react";
import "@tiendanube/styles/css/Form.css";
import { Button } from "..";

interface Props
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "children"> {
  /** Element inside tag component */
  children: React.ReactNode;
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

const Form: React.FC<Props> = ({
  children,
  submitText,
  submitCallback,
  optionalButtonText,
  optionalCallback,
  ...share
}: Props) => {
  return (
    <div {...share}>
      <div>Mancheta</div>
      <form action="">
        <input type="text" />
      </form>
      <div className="buttons">
        {optionalCallback && (
          <Button color="light" onClick={optionalCallback}>
            {optionalButtonText}
          </Button>
        )}
        <Button color="primary" onClick={submitCallback}>
          {submitText}
        </Button>
      </div>
      {children}
    </div>
  );
};

Form.defaultProps = {};

export default Form;
